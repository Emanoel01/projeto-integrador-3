import {Code} from "./codes"
import { randomUUID } from "expo-crypto"

interface Address {
    cep: string,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createType: "padrao" | "google",
    address: Address,
    created: string,
    password: string,
    deleteted: boolean,
    profileRating: number
}

interface Book {

}

interface UserBook {

}

interface Exchange {

}

interface Database {
    user: User[],
    book: Book[],
    userBook: UserBook[],
    exchange: Exchange[]
}

interface DatabaseResponse {
    status: "success" | "error",
    code: Code,
    message: string
}

const database: Database = 
    {
        user: [{
            id: randomUUID(),
            firstName: "Emanoel",
            lastName: "Barbosa",
            email: "emanoelbamorin@mail.com",
            createType: "google",
            address: {
                cep: "06327170",
                rua: "areado",
                bairro: "Cohab 5",
                cidade: "Carapicuiba",
                estado: "São Paulo",
                complemento: "Praça da arvore"
            },
            created: new Date().toLocaleDateString('pt-BR'),
            password: "senha",
            deleteted: false,
            profileRating: 0.0
        }] as User[],
        book: [] as Book[],
        userBook: [] as UserBook[],
        exchange: [] as Exchange[]
    }




export const createUser = (user: User): DatabaseResponse => {
    const existUser: User[] = database.user.filter((data: User) => data.email == user.email) 

    if(existUser.length > 0)
        return {status: "error", code: Code.USUARIO_EXISTENTE , message: ""}

    database.user.push(user)

    return {status: "success", code: Code.CADASTRADO_COM_SUCESSO,  message: ""}
}


export const getUserWithGoogleLogon = (email: string): DatabaseResponse | User => {
    const users: User[] = database.user.filter((data: User) => data.email == email)

    if(users.length == 0)
        return {status: "error", code: Code.USUARIO_NAO_ENCONTRADO,  message: ""}

    const user = users[0]

    if(user.createType != "google")
        return {status: "error", code: Code.USUARIO_EXISTENTE_SEM_LOGON_GOOGLE,  message: ""}

    return user
}


export const getUserByEmail = (email: string, password: string) => {
    const users: User[] = database.user.filter((data: User) => data.email == email)

    if(users.length == 0)
        return {status: "error", code: Code.USUARIO_NAO_ENCONTRADO,  message: ""}

    const user = users[0]

    // if(user.password != password)
    //     return {status: "error", code: Code.SENHA_INCORRETA,  message: ""}

    if(user.createType == "google")
        return {status: "error", code: Code.USUARIO_EXISTENTE_COM_LOGON_GOOGLE,  message: ""}

    return user
}


export const getUserData = (email: string) => {
    if(email!= undefined){
            const users: User[] = database.user.filter((data: User) => data.email == email)

        if(users.length == 0)
            return {status: "error", code: Code.USUARIO_NAO_ENCONTRADO,  message: ""}

        return users[0]
    }
    return {status: "error", code: Code.NAO_MAPEADO,  message: "Email veio vazio"}
}