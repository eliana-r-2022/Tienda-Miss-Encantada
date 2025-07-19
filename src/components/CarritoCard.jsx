import "../styles/Carrito.css"
import Carrito from "./Carrito"

//Este componente representa una tarjeta de producto agregado al componente carrito.
function CarritoCard({producto, funcionDisparadora, Carrito}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-producto" style={{color:"black"}}>{producto.name}</h3>
            {<p className="descripcion-carrito" style={{color:"black"}}>{producto.description}</p>}
            <img className="carrito-image" src={producto.imagen}></img>
            <span style={{color:"black"}}>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span style={{color:"black"}}>{producto.price} $</span>
            </div>
            <div className="carrito-sub">
                <span style={{color:"black"}}>{producto.cantidad * producto.price} $</span>
            </div>
            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "gray" ,color:"black"}}>X</button>
        </div> //Botón para eliminar producto cargado a la card carrito.
    )
}

export default CarritoCard