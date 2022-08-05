import {SaveOutlined} from "@mui/icons-material";
import {Grid, Typography, Button, TextField} from "@mui/material";
import {ImageGallery} from "../components";

const NoteView = () => {
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
					28 de Agosto 2023, NoteView
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
				/>

				<TextField
					tyoe="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedió en el día de hoy?"
					sx={{border: "none", mb: 1}}
					minRows={5}
				/>
			</Grid>
			{/* Galería de imagenes */}
			<ImageGallery />
		</Grid>
	);
};

export default NoteView;
