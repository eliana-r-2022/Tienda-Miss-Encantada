import React, { createContext, useState } from 'react';
// Crear el contexto
export const CarritoContext = createContext();
// Proveedor del contexto
export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    return { ...p, cantidad: p.cantidad + producto.cantidad }
                } else {
                    return p
                }
            })
            setProductosCarrito(carritoActualizado)
        } else {
            setProductosCarrito([...productosCarrito, producto])
        }
    };
    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    function borrarProductoCarrito(id) {
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
        setProductosCarrito(nuevoCarrito);
    }

    return (
        <CarritoContext.Provider value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}