import {Link as RouterLink} from "react-router-dom";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import AuthLayout from "../layout/AuthLayout";

const RegisterPage = () => {
	return (
		//xs -> hace referencia al tamaño
		// sx -> hace referencia a estilos css
		<AuthLayout title="Crear cuenta">
			<form>
				<Grid container>
					{/* Grid con la propiedad item, es un hijo del container */}
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Nombre completo"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
						/>
					</Grid>

					{/* Grid con la propiedad container, crea una caja */}
					<Grid container spacing={2} sx={{mb: 2, mt: 1}}>
						<Grid item xs={12}>
							<Button variant="contained" fullWidth>
								Crear cuenta
							</Button>
						</Grid>

						<Grid container direction="row" justifyContent="end">
							<Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
							<Link component={RouterLink} color="inherit" to="/auth/login">
								ingresar
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
