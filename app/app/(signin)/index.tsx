import React from 'react';
import { useState, useEffect } from 'react';
import {Alert, Button, Pressable, Text, TextInput, View} from 'react-native';
import { Redirect, useRouter, useRootNavigationState } from 'expo-router';
import {styles} from "./styles"
import { FontAwesome } from '@expo/vector-icons';
// import GoogleSignin from 'react-google-signin/GoogleSignin'
// import GoogleSigninButton from 'react-google-signin/GoogleSigninButton'
// import statusCodes from 'react-google-signin/statusCodes'
// import * as Google from "expo-google-app-auth"
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info"
import { useOAuth, useAuth } from '@clerk/clerk-expo';
import * as Linking from "expo-linking"
import { routeToScreen } from 'expo-router/build/useScreens';
import {getUserByEmail} from "../../services/apis/user-api"
import { Code } from '@/services/apis/codes';

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
    path: 'redirect',
    preferLocalhost: false
});

const SignIn = () => {
    const { isSignedIn, signOut } = useAuth();
    const redirectURL = Linking.createURL("/home")
    const googleOAuth = useOAuth({strategy: "oauth_google", redirectUrl: redirectURL})
    const [email, setEmail] = useState('')

    async function onGoogleSignIn() {
        try {
            const oAuth = await googleOAuth.startOAuthFlow()

            if(oAuth.authSessionResult?.type === "success"){
                if(oAuth.setActive){
                    await oAuth.setActive({session: oAuth.createdSessionId})
                }
            }else{
                console.log("ERRO NA AUTENTICACAO")
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
      if(isSignedIn){
        signOut()
      }
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    })

    const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 90
      }}>
      <Text style={styles.titleOne}>Troca</Text>
      <Text style={styles.titleTwo}>De</Text>
      <Text style={styles.titleThree}>Livros</Text>

      <TextInput placeholder='Email' style={styles.input} onChangeText={setEmail}/>
      <TextInput placeholder='Senha' style={styles.input} textContentType='password'/>

      <Pressable style={styles.logginButton} onPress={() =>  {
        if(email == ''){
          alert("preencha os campos de email e senha")
        } else {
          const responseGetUser = getUserByEmail(email, '')

          if('status' in responseGetUser){
            Alert.alert("Erro ao logar", Code[responseGetUser.code])
          }else{
            router.navigate({pathname: "/(home)", params: {email}})
          }
        }
      }}>
        <Text style={styles.logginButtonText}>logar</Text>
      </Pressable>

      <Pressable style={styles.logginButtonInverse} onPress={onGoogleSignIn}>
        <Text style={styles.logginButtonTextInverse}>logar com google <FontAwesome name="google" size={20} color="#DB4437" /></Text>
      </Pressable>

      <View style={{
        width: '95%',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'blue',
        // height: 50
      }}>
      <Pressable style={styles.logginButtonForgotPass} onPress={() => {
        router.navigate("/(forgotPassword)")
      }}>
        <Text style={styles.logginButtonTextForgotPass}>esqueci senha</Text>
      </Pressable>

      <Pressable style={styles.logginButtonSignUp} onPress={() => {
        setTimeout(()=>{
          router.navigate({pathname: "/(signup)", params: {
            isLoggedWithGoogle: "false",
            googleEmail:"",
            googleFirtsName: "",
            googleLastName: ""
          }})
        }, 1500)
      }}>
        <Text style={styles.logginButtonTextSignUp}>criar conta</Text>
      </Pressable>

      </View>


    </View>
  );
};

export default SignIn;