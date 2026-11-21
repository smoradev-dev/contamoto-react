// Importa StrictMode, que ayuda a detectar problemas durante el desarrollo
import { StrictMode } from 'react';
// Importa createRoot, que conecta React con el HTML de la página
import { createRoot } from 'react-dom/client';
// Importa el componente raíz de la aplicación
import App from './App';

// Busca el div con id "root" en index.html y dibuja dentro el componente App
createRoot(document.getElementById('root')).render(
  // Envuelve la app en StrictMode
  <StrictMode>
    {/* Componente principal */}
    <App />
  {/* Cierra StrictMode */}
  </StrictMode>
);
