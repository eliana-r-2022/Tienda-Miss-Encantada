import { Navigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

export default function Admin() {
    const {admin} = useAuthContext();

    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }//Se puede agregar el formulario de productos aquí dentro del return
    return(
        <div>
            <p>Componente Admin-Formulario de productos</p> 
        </div>
    )
}