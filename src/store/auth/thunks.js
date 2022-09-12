import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
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

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {


    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        console.log("respues del thunks: ", ok, " ", uid, " ", photoURL)

        //Aqui enviamos el {errorMessage} de esta manera ya que
        //en la función de logout se esta colocando como
        //payload.errorMessage eso quiere decir que esto es 
        //un objeto con esa propiedad
        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL }))

    }

}

export const startLoginWithEmailPassword = (emailLogin, password) => {
    console.log("startLogin: ", emailLogin, password)
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword(emailLogin, password)
        // { ok, udi, displayName, email, photoURL, errorMessage }
        console.log("resp startLoginWithEmailPassword: ", result)

        if (!result.ok) return dispatch(logout(result))

        dispatch(login(result))
    }


}

export const startLogout = () => {
    return async (dispatch) => {

        try {
            await logoutFirebase(logout())
            dispatch(clearNotesLogout())
        } catch (error) {
            console.log("Error en startLogout", error)
        }


    }

}