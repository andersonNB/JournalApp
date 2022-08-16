import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
        messageSaved: "",
        notes: [],
        active: null,
        //Ejemplo de como luce una nota
        //active: {
        //id:'1',title:"de la nota",body:"del mensaje",
        //date:de tipo number, imageUrls:[arreglo de imagenes subidas]}
    },
    reducers: {
        //Se activa al agregar una nueva nota
        addNewEmptyNote: (state, action) => {

        },
        //Mostrar que nota esta activa
        setActiveNote: (state, action) => {

        },
        //Cargar las notas
        setNotes: (state, action) => {

        },
        //Hacemos esta acción cuando grabamos las notas
        setSaving: (state) => {

        },
        //Actualizar una nota
        updateNote: (state, actcion) => {

        },
        //Eliminamos una nota por id
        deleteNodeById: (state, action) => {

        },
    }
});
export const { addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNodeById } = journalSlice.actions;