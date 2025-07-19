import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../authentication/firebase';
import Swal from 'sweetalert2';
import { dispararSweetBasico } from '../assets/SweetAlert';
import CerrarSesion from './BotonCerrarSesion';
import InicioSesion from './BotonIniciarSesion';
import Registro from './BotonRegistrarse';

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true); // muestra login o registro
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  // Solo para logeo rápido de admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/carrito');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Registro de usuario
  const registrarUsuario = (e) => {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        }
      });
  };

  // Inicio de sesión con email y contraseña
  const iniciarSesionEmailPass = (e) => {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        Swal.fire({
          title: 'Tu logeo fue exitoso!',
          icon: 'success',
          confirmButtonText: 'Confirmar',
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  };

  // Mostrar u ocultar formulario
  const handleShow = () => {
    setShow(!show);
  };

  // Vista de usuario logeado
  if (user || admin) {
    return (
      <div>
        <CerrarSesion text4="Cerrar sesión" onClick={logout}></CerrarSesion>
      </div>
    );
  }

  // Vista de login
  if (!user && show) {
    return (
      <div>
        <form onSubmit={iniciarSesionEmailPass}>
          <h2>Iniciar sesión con email y contraseña</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <InicioSesion text5="Iniciar sesión" type="submit"></InicioSesion>
        </form>

        <Registro text6="Registrarte" style={{ marginTop: "4px" }} onClick={handleShow}></Registro>
      </div>
    );
  }

  // Vista de registro
  if (!user && !show) {
    return (
      <div>
        <form onSubmit={registrarUsuario}>
          <h2>Registrarse</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>

        <button style={{ marginTop: "4px" }} onClick={handleShow}>Iniciar Sesión</button>
      </div>
    );
  }
}

export default Login2;
