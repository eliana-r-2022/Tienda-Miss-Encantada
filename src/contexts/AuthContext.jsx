import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    const login = (username) => {
        // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
        const token = `fake-token-${username}`;
        if(username == "admin@gmail.com"){ //Contraseña: test12 - Esta info se entrega una vez finalizado el proyecto junto con el link.
          setAdmin(true)
        }
        // Guarda en LocalStorage el nombre del usuario
        localStorage.setItem('authToken', token);
        setUser(username);
    };
    // para logearse
    const logout = () => {

        localStorage.removeItem('authToken');
        setUser(null);
        setAdmin(false)

    };

    function verificacionLog() {
        const userToken = localStorage.getItem("authToken")
        if (userToken && userToken == "fake-token-admin@gmail.com") {
            setAdmin(true)
            return
        } if (userToken) {
            setUser(userToken)
        }
    }


    return (

        <AuthContext.Provider value={{ user, login, logout, admin, verificacionLog }}>
            {children}
        </AuthContext.Provider>);

}

export const useAuthContext = () => useContext(AuthContext);