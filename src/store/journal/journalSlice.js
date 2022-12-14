import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        active: null,
        //Ejemplo de como luce una nota
        //active: {
        //id:'1',title:"de la nota",body:"del mensaje",
        //date:de tipo number, imageUrls:[arreglo de imagenes subidas]}
    },
    reducers: {
        //Se activa cuando se esta creado una nueva nota
        // y evitamos que se de clic repetidas veces
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        //Se activa al agregar una nueva nota
        addNewEmptyNote: (state, action) => {
            //el action.payload es la información que necesitamos
            console.log("JournalSlice action: ", action);

            state.notes.push(action.payload);
            state.isSaving = false

        },
        //Mostrar que nota esta activa
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSaved = "";
        },
        //Cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        //Hacemos esta acción cuando grabamos las notas
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
        },
        //Actualizar una nota
        updateNote: (state, action) => {

            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })

            //Cuando la nota se actualice
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },

        setPhotosToActiveNote: (state, action) => {
            // hacemos copia a las imagenes anteriores ...state.active.imageUrls
            // y de las nuevas con ...action.payload
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]

            //terminamos la carga volvemos el isSaving en false
            state.isSaving = false
        },
        // Limpiar las notas cuando cerramos sesión
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = []
            state.active = null
        },

        //Eliminamos una nota por id
        deleteNoteById: (state, action) => {
            console.log("action: ", action)
            state.active = null
            state.notes = state.notes.filter(noteDelete => noteDelete.id !== action.payload)

            //sin redux tolking
            // return {
            //     ...state,
            //     active:null,
            //     notes:state.notes.filter(noteDelete => noteDelete.id !== action.payload)
            // }
        },
    }
});
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;