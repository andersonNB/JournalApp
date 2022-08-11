import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import AuthLayout from "../layout/AuthLayout";
import {useForm} from "../../hooks";
import {startCreatingUserWithEmailPassword} from "../../store/auth";

const formData = {
	displayName: "",
	email: "andersonaugustonb@ufps.edu.co",
	password: "1234678",
};
// Validaciones personalizadas para el formulario
const formValidations = {
	displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
	email: [(value) => value.includes("@"), "El correo debe de tener una @"],
	password: [
		(value) => value.length >= 6,
		"El password debe de tener más de 6 letras",
	],
};

const RegisterPage = () => {
	const dispatch = useDispatch();

	//Creamos un state para evitar que salgan los mensajes de error
	// la primera vez que la persona ingresa a la página
	const [formSubmitted, setformSubmitted] = useState(false);

	//useSelector para tomar lo que necesitemos de nuestro
	//state
	const {status, errorMessage} = useSelector((state) => state.authRedux);

	//useMemo para memorizar el valor del status y no mandar a renderizar
	//el component cada que cambie el estado
	const isCheckingAuthentication = useMemo(
		() => status === "Checking",
		[status]
	);

	//Le podemos enviar las validaciones a nuestro useForm
	// como segundo argumento
	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	console.log(displayNameValid);

	const onSubmit = (event) => {
		event.preventDefault();
		setformSubmitted(true);

		//Si el formulario no es valido, no retornamos nada
		if (!isFormValid) return;

		console.log("formState tiene toda la data", formState);

		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		//xs -> hace referencia al tamaño
		// sx -> hace referencia a estilos css
		<AuthLayout title="Crear cuenta">
			{/* <h1>FormValid: {isFormValid ? "Valido" : "Incorrecto"} </h1> */}
			<form onSubmit={onSubmit}>
				<Grid container>
					{/* Grid con la propiedad item, es un hijo del container */}
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Nombre completo"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{mt: 2}}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
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
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					{/* Grid con la propiedad container, crea una caja */}
					<Grid container spacing={2} sx={{mb: 2, mt: 1}}>
						<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								disabled={isCheckingAuthentication}
								variant="contained"
								fullWidth
								type="submit"
							>
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
