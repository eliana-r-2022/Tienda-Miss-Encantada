//import { agregarProducto } from "../assets/requests";
import { dispararSweetBasico } from "../assets/SweetAlert";
import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductContext } from "../contexts/ProductContext";


function FormularioProducto({}) {

   const { agregarProducto } = useProductContext();
   const {admin} = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen:""
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm === true) {
      agregarProducto(producto)
        .then((data) => {
          setProducto({ name: '', price: '', description: '', imagen: ""});
        })
        .catch((error) => {
          dispararSweetBasico("Hubo un problema al agregar el producto.", error, "error")
        });
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }
  };

  if(!admin){
    return(
            <Navigate to="/login" replace/>
        )
  }

  return (
    <form onSubmit={handleSubmit2}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text" name="name" value={producto.name} onChange={handleChange} required />
      </div>
      <div>
        <label>URL de la imagen:</label>
        <input
          type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="price" value={producto.price} onChange={handleChange} required min="0" />
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
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;





