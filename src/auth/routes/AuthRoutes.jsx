import {Route, Routes, Navigate} from "react-router-dom";
import {LoginPage, RegisterPage} from "../Pages";

const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />

			{/* SI no esta en login o register */}
			<Route path="/*" element={<Navigate to="/auth/login" />} />
		</Routes>
	);
};

export default AuthRoutes;
