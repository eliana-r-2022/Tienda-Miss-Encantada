import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarritoProvider } from './contexts/CarritoContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* envolvemos toda la app */}
      <ProductProvider>
        <AuthProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </AuthProvider>
      </ProductProvider>
    </HelmetProvider>
  </StrictMode>
);
