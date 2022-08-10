import { singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from './'

export const chekingAuthentication = (email, password) => {


    return async (dispatch) => {

        //cambiar el not-authenticated, por cheking

        dispatch(checkingCredentials())

    }

}

// Se le pone start para inidicar que es el inicio de una tarea
// asincrona

export const startGoogleSingIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const result = await singInWithGoogle()

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))

        console.log(result)
    }
}