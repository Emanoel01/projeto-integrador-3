import { useEffect, useState } from "react"
import { View, Text, TextInput, Button, Pressable, Alert } from "react-native"
import * as SplashScreen from "expo-splash-screen"
import {styles} from "./styles"
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router"
import viacepApi from "../../services/apis/viacep"
import {createUser} from "../../services/apis/user-api"
import {randomUUID} from 'expo-crypto'


const Signup = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [complemento, setComplemento] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [signByGoogle, setSignByGoogle] = useState(false)

    const {isLoggedWithGoogle, googleEmail, googleFirtsName, googleLastName} = useLocalSearchParams<{  isLoggedWithGoogle: string, googleFirtsName: string, googleLastName: string, googleEmail: string}>()
    
    useEffect(() => {
        if(isLoggedWithGoogle.toLowerCase() === 'true'){
            setFirstName(googleFirtsName)
            setLastName(googleLastName)
            setEmail(googleEmail)
            setSignByGoogle(true)
        }
    }, [isLoggedWithGoogle, googleEmail, googleFirtsName, googleLastName])

    const callViaCep = async(cep: string) => {
        try {
            const address = await viacepApi(cep);
            if (address) {
              const {
                bairro,
                complemento,
                logradouro,
                localidade,
                uf,
              } = address;
              setCep(cep)
              setRua(logradouro || "");
              setBairro(bairro || "");
              setCidade(localidade || "");
              setEstado(uf || "");
              setComplemento(complemento || "");
            }
          } catch (err) {
            console.log({ err });
          }

    }

    return(
        <View style={{justifyContent: 'center', paddingTop: 50}}>
            <View style={{justifyContent: 'center', alignContent:'center', alignItems: 'center'}}>
                <TextInput placeholder="nome" style={styles.input} editable={ signByGoogle ? false : true} value={firstName} onChangeText={setFirstName}></TextInput>
                <TextInput placeholder="sobrenome" style={styles.input} value={lastName} editable={ signByGoogle ? false : true}></TextInput>
                <TextInput placeholder="email" style={styles.input} value={email} editable={ signByGoogle ? false : true}></TextInput>
                <TextInput placeholder="senha" style={styles.input}></TextInput>
                <TextInput placeholder="confirmar senha" style={styles.input}></TextInput> 
            </View>

            <View style={{justifyContent: 'center', alignContent:'center', alignItems: 'center'}}>
                <TextInput placeholder="cep" style={styles.input} maxLength={8} onChangeText={(text) => { if(text.length == 8) callViaCep(text)}}></TextInput>
                <TextInput placeholder="rua" style={styles.input} onChangeText={setRua} value={rua}></TextInput>
                <TextInput placeholder="bairro" style={styles.input} value={bairro} onChangeText={setBairro}></TextInput>
                <TextInput placeholder="cidade" style={styles.input} value={cidade} onChangeText={setCidade}></TextInput>
                <TextInput placeholder="estado" style={styles.input} value={estado} onChangeText={setEstado}></TextInput>
                <TextInput placeholder="complemento" style={styles.input} value={complemento} onChangeText={setComplemento}></TextInput>
            </View>

            <Pressable onPress={()=> {
                if(senha != confirmarSenha){
                    return Alert.alert("Erro ao criar conta", "as senhas nao conferem")
                }
                createUser({
                    id: randomUUID(),
                    created:  new Date().toLocaleDateString('pt-BR'),
                    createType: signByGoogle ? 'google' : 'padrao',
                    deleteted: false,
                    password: senha,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    address: {
                        bairro,
                        cep,
                        cidade,
                        complemento,
                        estado,
                        rua
                    },
                    profileRating: 0.0
                })
                router.navigate({pathname: "/(home)", params: {email}})
                }} style={styles.buttonSignUp}>
                <Text style={styles.logginButtonText}>criar conta</Text>
            </Pressable>
        </View>
    )
}


export default Signup