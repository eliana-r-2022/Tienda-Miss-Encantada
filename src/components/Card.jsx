import { Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";
import Producto1 from "./BotonDetalle";
import "../styles/Productos.css";

function CardProducto({ producto }) {
    return (
        <BootstrapCard className="m-3 h-100 d-flex flex-column">
            <BootstrapCard.Img
                variant="top"
                src={producto.imagen}
                style={{ height: "250px", objectFit: "cover" }}
            />
            <BootstrapCard.Body className="d-flex flex-column">
                <BootstrapCard.Title>{producto.name}</BootstrapCard.Title>
                <BootstrapCard.Text style={{ color: "black" }}>
                    {producto.price} $
                </BootstrapCard.Text>
                <div className="mt-auto">
                    <Link to={`/productos/${producto.id}`}>
                        <Producto1 text1="Ver traje" style={{ color: "black" }} />
                    </Link>
                </div>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
}

export default CardProducto;




