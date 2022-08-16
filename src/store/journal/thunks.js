import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from "../../firebase/config";
//start para empezar el proceso, es decir este es el inicio
export const startNewNote = () => {

    return async (dispatch, getState) => {

        //Con la función getState obtenemos el estado
        // de nuestro store -> console.log(getState())

        console.log("LLegamos al thunks")

        const { uid } = getState().authRedux;

        //Si vamos a grabar en firebase necesitamos el uid

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Creamos un nuevo newDoc haciendo referencia a los
        //documentos de firebase y le añadimos la nota
        //utilizando el doc

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const setDocResp = await setDoc(newDoc, newNote)
        //Si se inserta correctamente haremos los dispatch

        console.log({ newDoc, setDocResp })

        /*Haremos diferentes dispatch
          dispatch(newNote)
          dispatch(activarNote)
        */

    }

}