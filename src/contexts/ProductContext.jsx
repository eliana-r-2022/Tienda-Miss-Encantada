import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState(null);

    // Obtener todos los productos
    const obtenerProductos = () => {
        return fetch('https://68100d8b27f2fdac24101ef5.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos);
                setProductos(datos);
                setProductosOriginales(datos)
                return datos;
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
                throw error;
            });
    };

    // Obtener un producto por ID
    const obtenerProducto = (id) => {
        return fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${id}`)
            .then((respuesta) => {
                if (!respuesta.ok) throw new Error("Producto no encontrado.");
                return respuesta.json();
            })
            .then((producto) => {
                setProductoEncontrado(producto);
                return producto;
            })
            .catch((error) => {
                console.error("Error:", error);
                throw error;
            });
    };

    // Agregar un nuevo producto
    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch('https://68100d8b27f2fdac24101ef5.mockapi.io/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error('Error al agregar el producto.');

            const data = await respuesta.json();
            console.log('Producto agregado:', data);
            return data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    // Editar un producto existente
    const editarProducto = async (producto) => {
        try {
            const respuesta = await fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${producto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error('Error al actualizar el producto.');

            const data = await respuesta.json();
            console.log('Producto actualizado:', data);
            return data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    // Eliminar un producto
    const eliminarProducto = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar?');
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${id}`, {
                method: 'DELETE',
            });

            if (!respuesta.ok) throw new Error('Error al eliminar el producto.');

            // Actualizar lista de productos localmente
            setProductos((prevProductos) => prevProductos.filter((prod) => prod.id !== id));

            console.log(`Producto ${id} eliminado correctamente.`);
            alert('Producto eliminado correctamente.');
        } catch (error) {
            console.error(error.message);
            alert('Hubo un problema al eliminar el producto.');
            throw error;
        }
    };

    function filtrarProductos(filtro) {
    if (filtro.length === 0) {
        setProductos(productosOriginales);
        return;
    }

    const productosFiltrados = productosOriginales.filter((producto) =>
        producto.name.toLowerCase().includes(filtro.toLowerCase())
    );
    setProductos(productosFiltrados);
}


    return (
        <ProductContext.Provider
            value={{
                filtrarProductos,
                obtenerProductos,
                productos,
                agregarProducto,
                obtenerProducto,
                productoEncontrado,
                editarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
