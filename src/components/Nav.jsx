import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav as BootstrapNav, Container } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";

function Nav() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin } = useAuthContext();

  return (
    <Navbar expand="md" style={{ backgroundColor: "#FFBE98" }} variant="dark">
      <Container>
        <Navbar.Brand>
          <img src="/logo.png" alt="Logo" className="imagen-rounded" style={{ width: "180px" }}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <BootstrapNav className="ms-auto">
            <BootstrapNav.Link as={Link} to="/" style={{ color: "white" }}>
              Inicio
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos" style={{ color: "white" }}>
              Catálogo
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/nosotros" style={{ color: "white" }}>
              Conócenos
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/contacto" style={{ color: "white" }}>
              Contacto
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/login" style={{ color: "white" }}>
              Login
            </BootstrapNav.Link>
            {admin && (
              <BootstrapNav.Link as={Link} to="/admin/agregarProductos" style={{ color: "white" }}>
                Agregar productos
              </BootstrapNav.Link>
            )}
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;




