import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote } from "./journalSlice";
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

export const startSaveNote = () => {
    return async (dispatch, getState) => {


        dispatch(setSaving())

        //Nuestro uid del usuario autenticado
        const { uid } = getState().authRedux;

        const { active: note } = getState().journal

        //Debemos remover el id de la nota activa 
        //antes ya que firestone nos lo crea
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        console.log(noteToFireStore)

        //Ahora para guardar en firestone vamos a sacar
        // la referencia al doc donde queremos guardar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })

        //En este punto actualizamos los cambios
        //que se hagan en local y a su vez se puedan
        //visualizar
        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        console.log("files en el thunks: ", files)


        //Vamos a disparar todas las peticiones simultaneamente 
        // en vez de una por una (for,foreach)
        //rellenamos el arreglo
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        //aquí ya tenemos el arreglo de imagenes y con
        // el promise.all hacemos el llamado de manera simultanea
        // y no iterativa
        const photosUrls = await Promise.all(fileUploadPromises);
        console.log("photosUrls: ", photosUrls)

        dispatch(setPhotosToActiveNote(photosUrls))

    }
}