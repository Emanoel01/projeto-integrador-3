import { Redirect, router, Slot, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo"
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import SignIn from "./(signin)";
import Home from "./(home)";
import { getUserWithGoogleLogon } from "../services/apis/user-api"
import { Code } from "@/services/apis/codes";

const PUBLICK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string


function InitialLayout() {
    const { isSignedIn, isLoaded, actor } = useAuth();
    const router = useRouter();
    const user = useUser()
  
    useEffect(() => {
      if (isLoaded) {
        if (isSignedIn) {

          const responseGoogleLogon = getUserWithGoogleLogon(user.user?.primaryEmailAddress?.emailAddress || '')

          if('status' in responseGoogleLogon){

            if(responseGoogleLogon.code === Code.USUARIO_NAO_ENCONTRADO){
              router.replace({
                pathname: "/(signup)",
                params:{
                  isLoggedWithGoogle: "true",
                  googleEmail: user.user?.primaryEmailAddress?.emailAddress,
                  googleFirtsName: user.user?.firstName,
                  googleLastName: user.user?.lastName
                }
              });
            }else{
              Alert.alert("Erro ao logar com google", Code[responseGoogleLogon.code])

              router.replace({pathname: "/(signin)"})
            }

          }else{
            router.replace({
              pathname: "/(home)",
              params:{
                email: user.user?.primaryEmailAddress?.emailAddress
              }
            });
          }
        } else {
          router.replace({pathname: "/(signin)"});
        }
      }
    }, [isLoaded, isSignedIn]);
  
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return <Slot />;
  }


export default function Layout(){
    return (
        <ClerkProvider publishableKey={PUBLICK_KEY}>
           <InitialLayout/>
        </ClerkProvider>
    )
}