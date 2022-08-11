import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";

const useCheckAuth = () => {


    const { status } = useSelector((state) => state.authRedux);

    const dispatch = useDispatch();

    //Este efecto se encarga de "verificar" si el usuario esta
    // autenticado
    useEffect(() => {
        //Esta función de firebase nos permite saber si el estado
        // del usuario cambia
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log("useEffect AppRouter ", user);

            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;

            dispatch(login({ uid, email, displayName, photoURL }));
        });
    }, []);


    //este custom hook puede o no retornar algo
    //lo podemos enviar así {status} o directamente así status
    return status

}

export default useCheckAuth