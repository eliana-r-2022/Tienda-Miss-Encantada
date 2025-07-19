import "../styles/Carrito.css"
import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from '../contexts/AuthContext';
import BotonVaciar from "./BotonVaciarCarrito.jsx";

export default function Carrito() {
    const {user} = useAuthContext();
    const {productosCarrito, vaciarCarrito, borrarProductoCarrito} = useContext(CarritoContext);
    console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    )

    function funcionDisparadora(id){
        borrarProductoCarrito(id)
    }

    console.log("Total: " + total)

    if(!user){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return(
        <div className="carrito-conteiner">
            <BotonVaciar text3="Vaciar carrito" onClick={vaciarCarrito}></BotonVaciar>
            <div className="carrito-titulos" >
                <h4 className="carrito-titulo-producto"> Producto </h4>
                <h4 className="carrito-titulo-descripcion">Descripción</h4>
                <span></span>
                <h4>Cantidad</h4>
                <h4>Precio<br></br>unitario</h4>
                <h4>Sub total</h4>
                <span></span>
            </div>            {/*Si hay productos, recorre cada uno.*/}                                                                      
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (   //Evalúa si productosCarrito tiene elementos. Si el carrito tiene al menos un producto, se ejecuta lo que está después del signo ? (operador ternario). Si no, se devuelve null.
               //Por cada producto, renderiza un componente CarritoCard.
               <CarritoCard                       
                    key={producto.id} //Le paso el producto
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                    //funcionDisparadora={funcionDisparadora} //Le paso la función que borra el producto
                />
            ))
            : <p>Carrito sin producto</p>}
            {total > 0 ? <span>Total a pagar: {total.toFixed(2)} $</span>: <></>}
        </div>
    )
}