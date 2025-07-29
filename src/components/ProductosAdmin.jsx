import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { toast } from 'react-toastify';
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Form,
  Spinner
} from "react-bootstrap";

function ProductosAdmin() {
  const { productos, obtenerProductos, eliminarProducto } = useProductContext();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos().then(() => setCargando(false));
  }, []);

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) => {
      const nuevaSeleccion = new Set(prev);
      if (nuevaSeleccion.has(id)) {
        nuevaSeleccion.delete(id);
      } else {
        nuevaSeleccion.add(id);
      }
      return nuevaSeleccion;
    });
  };

  const borrarSeleccionados = async () => {
    if (seleccionados.size === 0) {
      toast.warn("No hay productos seleccionados");
      return;
    }
    if (!window.confirm("¿Estás seguro de eliminar los productos seleccionados?")) return;

    try {
      for (const id of seleccionados) {
        await eliminarProducto(id, false); 
      }
      setSeleccionados(new Set());
      toast.success("Productos eliminados correctamente");
    } catch (error) {
      toast.error("Hubo un error al eliminar algunos productos");
      console.error(error);
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
      </div>
    );
  }

  return (
   <Container className="py-5">
  <Row className="justify-content-center">
    <Col md={10}>
      <div className="p-4 bg-white shadow-sm rounded">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Gestión de Productos</h2>
          <Button
            variant="danger"
            onClick={borrarSeleccionados}
            disabled={seleccionados.size === 0}
          >
            Eliminar seleccionados
          </Button>
        </div>

        {/* Tabla */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">
                <Form.Check
                  type="checkbox"
                  aria-label="Seleccionar todos"
                  onChange={(e) => toggleSeleccionTodos(e.target.checked)}
                  checked={seleccionados.size === productos.length && productos.length > 0}
                />
              </th>
              <th>Nombre</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="text-center">
                    <Form.Check
                      type="checkbox"
                      aria-label={`Seleccionar ${producto.name}`}
                      checked={seleccionados.has(producto.id)}
                      onChange={() => toggleSeleccion(producto.id)}
                    />
                  </td>
                  <td>{producto.name}</td>
                  <td>${producto.price}</td>
                  <td className="text-center">
                    {/* Acciones */}
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => editarProducto(producto.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Col>
  </Row>
</Container>
  );
}

export default ProductosAdmin;
