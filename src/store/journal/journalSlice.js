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
        },
        //Cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        //Hacemos esta acción cuando grabamos las notas
        setSaving: (state) => {

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

        },
        //Eliminamos una nota por id
        deleteNodeById: (state, action) => {

        },
    }
});
export const {
    addNewEmptyNote,
    deleteNodeById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;