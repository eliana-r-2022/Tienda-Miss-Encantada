import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../authentication/firebase';
import Swal from 'sweetalert2';
import { dispararSweetBasico } from '../assets/SweetAlert';
import CerrarSesion from './BotonCerrarSesion';
import InicioSesion from './BotonIniciarSesion';
import Registro from './BotonRegistrarse';
import { CiTextAlignCenter } from 'react-icons/ci';

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
      <div className="">
        <form onSubmit={iniciarSesionEmailPass} className="p-4 border rounded shadow w-50 mx-auto mt-5">
          <h2>Iniciar sesión con email y contraseña</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input value={usuario}
              onChange={(e) => setUsuario(e.target.value)} type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input value={password}
              onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
          </div>
          <div className='d-flex justify-content-between'>
          <InicioSesion text5="Iniciar sesión" type="submit"></InicioSesion>
          <Registro text6="Registrarte" onClick={handleShow}></Registro>
          </div>
        </form>
      </div>

    )
  }

  // Vista de registro
  if (!user && !show) {
    return (
      <div className="">
        <form onSubmit={registrarUsuario} className="p-4 border rounded shadow w-50 mx-auto mt-5">
          <h2>Registrarse</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)} className="form-control" required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} className="form-control" required
            />
          </div>
          <div className='d-flex justify-content-between'>
            <Registro text6="Registrarte" onClick={handleShow}></Registro>
            <InicioSesion text5="Iniciar sesión" type="submit"></InicioSesion>
          </div>
        </form>
      </div>
    );
  }
}

export default Login2;
