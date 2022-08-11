import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        const credentials = GoogleAuthProvider.credentialFromResult(result)

        // console.log(credentials)

        const { displayName, email, photoURL, uid } = result.user

        console.log(result.user)

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }


    } catch (error) {
        // console.log(error)

        const errorCode = error.code;
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage,

        }
    }
}

//Registramos un usuario con Firebase
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    //Esta tarea puede fallar por uso utilizamos un try-catch

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user
        console.log("resp del registerUserWithEmailPassword ", resp)
        //Aun no se actualiza el displayName en firebase
        //con updateProfile se le pasa el usuario actual y se puede
        //actualizar el photoURL y el displayName, pasandolos como objetos
        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok: true,
            uid, photoURL, email, displayName,
        }

    } catch (error) {
        console.log("error registerUser: ", error);
        return {
            ok: false,
            errorMessage: error.message,

        }
    }


}

export const loginWithEmailPassword = async (emailLogin, password) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, emailLogin, password)
        const { uid, displayName, email, photoURL } = resp.user

        console.log("udi: ", uid)
        console.log("resp del loginWithEmailPassword: ", resp)

        return {
            ok: true,
            uid, displayName, email, photoURL
        }

    } catch (error) {
        console.log("error loginWithEmailPassword ", error)
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}