import {useDispatch} from "react-redux";
import {IconButton, Typography, Grid} from "@mui/material";
import {AddOutlined, Reddit} from "@mui/icons-material";
import JournalLayout from "../layout/JournalLayout";
import {NothingSelectedView, NoteView} from "../views";
import transition from "../../assets/hover.webp";
import videoLich from "../../assets/video/Tile_Anim_WoW_ClassicLich.mp4";
import "../styles/JournalPage.css";
import {startNewNote} from "../../store/journal";

const JournalPage = () => {
	const dispatch = useDispatch();

	const onClickNewNote = () => {
		//Nota: si quiero ejecutar una acción de nuestro thunks
		// o reducer se ocupa utilizar el dispatch
		dispatch(startNewNote());
	};

	return (
		<JournalLayout>
			<Typography variant="h6">JournalPage</Typography>
			<Reddit />
			{/* Cuando no hay nada seleccionado 
			mostrar Algo , ej: NothingSelected
			 */}
			<NothingSelectedView />
			{/* Caso contrario
			   NoteView
			  */}
			{/* <NoteView /> */}
			<IconButton
				size="large"
				sx={{
					color: "white",
					backgroundColor: "error.main",
					":hover": {
						backgroundColor: "error.main",
						opacity: 0.9,
					},
					postion: "fixed",
					left: 850,
					bottom: 10,
				}}
				onClick={onClickNewNote}
			>
				<AddOutlined sx={{fontSize: 30}} />
			</IconButton>

			<Grid sx={{backgroundColor: "#2BF5FF"}} container>
				<Grid item xs={6} sx={{backgroundColor: "#2aff32"}}>
					<img src={transition} alt="Link king" className="transitionProduct" />
					<video controls autoPlay loop muted className="Animate">
						<source
							src="https://blz-contentstack-assets.akamaized.net/v3/assets/blta8f9a8e092360c6c/blt8a8def536e5e4a0e/625efe6b3dc3652316810e95/Tile_Anim_WoW_ClassicLich.mp4"
							type="video/mp4"
						></source>
					</video>
				</Grid>
				<Grid item xs={6} sx={{backgroundColor: "#5800FF"}}>
					still
				</Grid>
			</Grid>
		</JournalLayout>
	);
};

export default JournalPage;
