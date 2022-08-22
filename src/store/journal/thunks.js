import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./journalSlice";
//start para empezar el proceso, es decir este es el inicio
export const startNewNote = () => {

    return async (dispatch, getState) => {

        //Con la función getState obtenemos el estado
        // de nuestro store -> console.log(getState())

        console.log("LLegamos al thunks")
        dispatch(savingNewNote())

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

        //Le creamos la propiedad ia a nuestra nota
        newNote.id = newDoc.id

        console.log({ newDoc, setDocResp })
        //Si se inserta correctamente haremos los dispatch
        /*Haremos diferentes dispatch
          dispatch(newNote)
          dispatch(activarNote)
        */
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }

}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().authRedux;

        //Validamos que nuestra dependencia exista, sino enviamos
        // un error
        if (!uid) throw new Error('El UID del usuario no existe')

        console.log("startLoadingNotes uid: ", uid)

        const notesRedux = await loadNotes(uid)

        dispatch(setNotes(notesRedux))
    }
}