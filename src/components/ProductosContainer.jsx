import { useEffect, useState, useContext } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { CarritoContext } from "../contexts/CarritoContext";
import { useProductContext } from "../contexts/ProductContext";
import { Helmet } from "react-helmet-async";
//import { Row, Col } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./Card";


function ProductosContainer() {
    const { productos, obtenerProductos, filtrarProductos } = useProductContext();
    const productosPorPagina = 10; // Cantidad de productos a mostrar por página
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    ////////////////////////////////////////////////
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { agregarAlCarrito } = useContext(CarritoContext);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        obtenerProductos()
            .then(() => {
                setCargando(false);
            })
            .catch(() => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);

    useEffect(() => {
        filtrarProductos(filtro);
    }, [filtro]);

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="productos-container">
            <Helmet>
                <title>Productos | Mi Tienda</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>

            <input
                type="text"
                placeholder="Buscar productos..."
                className="form-control mb-3"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            <Row xs={1} md={2} lg={4} className="g-4">
                {productosActuales.map((producto) => (
                    <Col key={producto.id} className="d-flex">
                        <CardProducto
                            producto={producto}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    </Col>
                ))}
            </Row>
            {/* Paginador */}
            <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductosContainer;



