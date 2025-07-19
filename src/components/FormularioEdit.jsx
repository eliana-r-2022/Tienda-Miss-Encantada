import { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";


function FormularioEdit({ }) {
  const {admin} = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductContext();
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    imagen: ""
  });

  if (!admin) {
    return (
      <Navigate to="/login" replace />
    )
  }

  // Cuando cambia productoSeleccionado, actualizamos el estado
  useEffect(() => {
  obtenerProducto(id)
    .then(() => {
      if(productoEncontrado && productoEncontrado.id) {
        setProducto({
          id: productoEncontrado.id,
          name: productoEncontrado.name || '',
          price: productoEncontrado.price || '',
          description: productoEncontrado.description || '',
          imagen: productoEncontrado.imagen || ''
        });
      }
      setCargando(false);
    })
    .catch((error) => {
      if(error === "Producto no encontrado"){
        setError("Producto no encontrado")
      } else if(error === "Hubo un error al obtener el producto.") {
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
}, [id, productoEncontrado]);


  /*useEffect(() => {
    obtenerProducto(id).then(() => {
      //setProducto(productoEncontrado)
    //setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio."
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0."
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres."
    }
    if(!producto.imagen.trim()){
        return("La url de la imagen no debe estar vacía")
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      editarProducto(producto).then((pro) => {
       toast.success("Producto editado correctamente.");
      }).catch(error => {
        toast.error("Hubo un problema al actualizar el producto." + error.message);
      })
    }else{
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la imagen:</label>
        <input
          type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Actualizar Producto</button>
      <ToastContainer/> 
    </form>
    // Tiene que estar la etiqueta <ToastContainer/> para que funcione la alerta en donde se aplica
  );
}

export default FormularioEdit;


/*import React, { useState } from 'react';

export default function Formulario() {

    const [nombre, setNombre] = useState('');
    function manejarEnvio(evento) {
        evento.preventDefault();
        alert(`Formulario enviado por: ${nombre}`);
    }
    return (
        <form onSubmit={manejarEnvio}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresar tu nombre"
            />
            <button type="submit">Enviar</button>
        </form>
    );

}*/