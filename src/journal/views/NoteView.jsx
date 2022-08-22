import {useMemo} from "react";
import {useSelector} from "react-redux";
import {SaveOutlined} from "@mui/icons-material";
import {Grid, Typography, Button, TextField} from "@mui/material";
import {ImageGallery} from "../components";
import {useForm} from "../../hooks";

const NoteView = () => {
	const {active: activeNote} = useSelector((state) => state.journal);

	const {body, title, onInputChange, formState, date} = useForm(activeNote);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

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
				<Button color="primary" sx={{padding: 2}}>
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
			{/* Galería de imagenes */}
			<ImageGallery />
		</Grid>
	);
};

export default NoteView;
