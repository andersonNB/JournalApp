import { checkingCredentials } from './'

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
    }
}