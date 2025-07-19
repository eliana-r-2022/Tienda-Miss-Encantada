import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Producto from "./BotonCompra";
import { FaShoppingCart } from "react-icons/fa";
import Producto2 from "./BotonEliminar";
import CarritoIcono from "./CarritoIcono";


function ProductoDetalle() {

  const navegar = useNavigate();

  const {admin} = useAuthContext();
  const { agregarAlCarrito, productosCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto} = useProductContext();

  const { id } = useParams();
  //const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProducto(id).then(() => {
      navegar("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto.", error, "error")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  // 📌 Calculamos el total de productos en carrito directamente desde context
  const cantidadTotalCarrito = productosCarrito.reduce((total, item) => total + item.cantidad, 0);

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img
  className="producto-image"
  src={productoEncontrado.imagen || "https://dummyimage.com/300x300/cccccc/000000&text=Sin+Imagen"}
  alt={productoEncontrado.name}
  onError={e => {
    e.target.onerror = null;
    e.target.src = "https://dummyimage.com/300x300/cccccc/000000&text=Sin+Imagen";
  }}
/>

      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} $</p>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        {admin ? <Link to={"/admin/editarProducto/" + id}> <Producto text="Editar Producto" ></Producto></Link> : <Producto text="Al carrito" onClick={funcionCarrito}></Producto> }
        {admin ? <Producto2 text2="Eliminar prodcuto" onClick={dispararEliminar}></Producto2> : <></>}
        {/* Aquí el botón carrito con icono */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CarritoIcono
            cantidad={cantidadTotalCarrito}
            iconColor="white"
            iconSize="30px"
            onClick={() => navigate("/carrito")}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;

/*<BotonCarrito onClick={() => navigate("/carrito")} style={{ marginTop: "10px" }}>
          🛒 Carrito ({cantidadTotalCarrito})
        </BotonCarrito>*/
