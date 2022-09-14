import {useMemo, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
//Paquetes de terceros---
import {DeleteOutline, SaveOutlined, UploadOutlined} from "@mui/icons-material";
import {Grid, Typography, Button, TextField, IconButton} from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
//---
import {ImageGallery} from "../components";
import {useForm} from "../../hooks";
import {
	setActiveNote,
	startDeletingNote,
	startSaveNote,
	startUploadingFiles,
} from "../../store/journal";

const NoteView = () => {
	const dispatch = useDispatch();

	const {
		active: activeNote,
		messageSaved,
		isSaving,
	} = useSelector((state) => state.journal);

	const {body, title, onInputChange, formState, date} = useForm(activeNote);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	//Obtenemos la referencia al input para simular el click
	const fileInputRef = useRef();

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	//Creamos otro efecto secundario que este pendiente del cambio de la tarjeta
	//pero hacemos una validación para cuando la cadena este llena
	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire("Nota actualizada", messageSaved, "success");
		}
	}, [messageSaved]);

	const onSaveNote = () => {
		dispatch(startSaveNote());
	};

	//Aquí capturamos los archivos que se van a subir
	const onFileInputChange = ({target}) => {
		console.log("target.files: ", target.files);
		console.log("fileInputRef: ", fileInputRef);
		//Si es igual a 0 quiere decir que no subio un archivo
		if (target.files === 0) return;

		dispatch(startUploadingFiles(target.files));
	};

	const onDelete = () => {
		dispatch(startDeletingNote());
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			sx={{mb: 1}}
			alignItems="center"
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					ref={fileInputRef}
					onChange={onFileInputChange}
					style={{display: "none", backgroundColor: "salmon"}}
				/>
				<IconButton
					color="primary"
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					disabled={isSaving}
					onClick={onSaveNote}
					color="primary"
					sx={{padding: 2}}
				>
					<SaveOutlined sx={{fontSize: 30, mr: 1}} />
					Guardar
				</Button>
			</Grid>

			<Grid container>
				<TextField
					tyoe="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Titulo"
					sx={{border: "none", mb: 1}}
					name="title"
					value={title}
					onChange={onInputChange}
				/>

				<TextField
					tyoe="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedió en el día de hoy?"
					sx={{border: "none", mb: 1}}
					minRows={5}
					name="body"
					value={body}
					onChange={onInputChange}
				/>
			</Grid>

			<Grid container justifyContent="end">
				<Button onClick={onDelete} sx={{mt: 2}} color="error">
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>

			{/* Galería de imagenes */}
			<ImageGallery images={activeNote.imageUrls} />
		</Grid>
	);
};

export default NoteView;
