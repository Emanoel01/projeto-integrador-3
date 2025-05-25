import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    button: {
        width:'90%',
        height: 50,
        backgroundColor: 'black',
        borderRadius: 5,
        color: 'white',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 20,
        // backgroundColor: 'blue'
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10.0,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 10,
        color: 'black'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})