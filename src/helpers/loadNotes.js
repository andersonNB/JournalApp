import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from "../firebase/config"
//Este helper puede ir directamente en la carpeta del journal
//ya que es un función relacionada a el, pero en este punto
// también es valido colocarla

export const loadNotes = async (uid = "") => {

    if (!uid) throw new Error('El UID del usuario no existe')


    //ponemos la referencia a la colección en firestore
    //si pedimos una colección apuntar a esa colección como tal

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)

    //traemos la información, exactamente esto es la
    //referencia a donde está esa info
    const docs = await getDocs(collectionRef)
    console.log("loadNotes docs: ", docs)

    //De esta manera extraemos la info
    const notes = [];
    docs.forEach(doc => {
        console.log("doc.data: ", doc.data())
        notes.push({ id: doc.id, ...doc.data() })
    })

    console.log("loadNotes notes: ", notes)

    return notes;

}