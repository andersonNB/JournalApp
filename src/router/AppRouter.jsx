import {Navigate, Route, Routes} from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import {useCheckAuth} from "../hooks";
import JournalRoutes from "../journal/routes/JournalRoutes";
import {CheckingAuth} from "../ui";

const AppRouter = () => {
	const status = useCheckAuth();

	if (status === "Checking") {
		return <CheckingAuth />;
	}

	return (
		// Para evitar que se muestre el login debemos
		// condicionar nuestras rutas o protegerlas
		// para que de esta manera no se puedan acceder
		// a menos de que cumplan la condición
		<Routes>
			{status === "authenticated" ? (
				<Route path="/*" element={<JournalRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />

			{/* Login y registro */}
			{/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

			{/* JournalApp */}
			{/* <Route path="/*" element={<JournalRoutes />} /> */}
		</Routes>
	);
};

export default AppRouter;
