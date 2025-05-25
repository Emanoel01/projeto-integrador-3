import { View, Text,TextInput, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"

const forgotPassword = () => {

    const [hasToken, setHasToken] = useState(false)

    return (
        <View>
            {hasToken ? 
                (
                <View style={{opacity: hasToken ? 1: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>Digite a nova senha</Text>
                    <TextInput placeholder="token" style={styles.input}></TextInput>
                    <TextInput placeholder="nova senha" style={styles.input}></TextInput>
                    <TextInput placeholder="confirme a nova senha" style={styles.input}></TextInput>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}> redefinir senha</Text>
                    </Pressable>
                    <Pressable onPress={() => {setHasToken(false)}} style={styles.button}>
                        <Text style={styles.buttonText}> Não tenho o token</Text>
                    </Pressable>
                </View>
                ) :
                (
                <View style={{opacity: hasToken ? 0: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>Sera enviado um token para a redefinição da senha</Text>
                    <TextInput placeholder="email"  style={styles.input}></TextInput>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}> Enviar token</Text>
                    </Pressable>
                    <Pressable onPress={() => {setHasToken(true)}} style={styles.button}>
                        <Text style={styles.buttonText}> Ja tenho token</Text>
                    </Pressable>
                </View>
                )
                
            }

        </View>
    )
}

export default forgotPassword