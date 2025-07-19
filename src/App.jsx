import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './layouts/Home';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Login from './components/Login';
import Login2 from './components/Login2';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdit from './components/FormularioEdit';
import { useAuthContext } from './contexts/AuthContext';
import LoginBoots from './components/LoginBoots';


function App() {

  const {verificacionLog} = useAuthContext();

 useEffect(() => {
  verificacionLog()
 }, [])

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginBoots />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/admin/agregarProductos" element={<FormularioProducto />} />
          <Route path="/admin/editarProducto/:id" element={<FormularioEdit />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



