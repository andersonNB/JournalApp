import {StarOutline} from "@mui/icons-material";
import {Grid, Typography} from "@mui/material";

/**
 * EL concepto de vista es practicamente
 * una agrupación de contenido principal
 * que se puede entender como otro componente
 * aunque cabe aclarar que el concepto puede
 * extenderse más
 * @returns view
 */
const NothingSelectedView = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{
				minHeight: "calc(100vh - 110px)",
				backgroundColor: "primary.main",
				borderRadius: 3,
			}}
		>
			<Grid item xs={12}>
				<StarOutline sx={{fontSize: 100, color: "white"}} />
			</Grid>
			<Grid>
				<Typography color="white" variant="h5">
					Selecciona o crea una entrada
				</Typography>
			</Grid>
			hi
		</Grid>
	);
};

export default NothingSelectedView;
