import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import AuthLayout from "../layout/AuthLayout";
import {useForm} from "../../hooks";
import {
	chekingAuthentication,
	startGoogleSingIn,
	startLoginWithEmailPassword,
} from "../../store/auth";
import imgPath from "../../assets/murky.png";

const LoginPage = () => {
	const {status, errorMessage} = useSelector((state) => state.authRedux);
	const dispatch = useDispatch();

	const {email, password, onInputChange, onResetForm} = useForm({
		email: "",
		password: "",
	});

	//Memorizamos el resultado del status
	const isAuthenticating = useMemo(() => status === "Checking", [status]);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(email, " ", password);

		// dispatch(chekingAuthentication(email, password));

		dispatch(startLoginWithEmailPassword(email, password));

		onResetForm();
	};

	const onGoogleSignIn = (event) => {
		event.preventDefault();
		console.log("Hi, I'm google Sign in");
		dispatch(startGoogleSingIn());
	};

	return (
		//xs -> hace referencia al tamaño
		// sx -> hace referencia a estilos css
		<AuthLayout title="Login">
			<form
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<Grid container>
					{/* Grid con la propiedad item, es un hijo del container */}
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid container sx={{mt: 1}}>
						<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
					</Grid>

					{/* Grid con la propiedad container, crea una caja */}
					<Grid container spacing={2} sx={{mb: 2, mt: 1}}>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								variant="contained"
								fullWidth
								type="submit"
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								variant="contained"
								fullWidth
								onClick={onGoogleSignIn}
							>
								<Google />
								<Typography sx={{ml: 1}}>Google</Typography>
							</Button>
							<img
								src={imgPath}
								alt="murky"
								style={{width: 190, height: 200, position: "absolute"}}
							/>
						</Grid>

						<Grid container direction="row" justifyContent="end">
							<Link component={RouterLink} color="inherit" to="/auth/register">
								Crear una cuenta
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
