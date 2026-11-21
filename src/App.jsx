// Importa el componente RegistroGastos desarrollado para la evidencia
import RegistroGastos from './components/RegistroGastos';
// Importa los estilos generales de la aplicación
import './App.css';

// Componente raíz: simula la pantalla de un celular y muestra el componente de gastos
export default function App() {
  // Devuelve el JSX de la aplicación
  return (
    // Contenedor que centra el "celular" en la pantalla
    <main className="fondo">
      {/* Marco con tamaño de celular */}
      <div className="celular">
        {/* Barra superior con el nombre de la app */}
        <div className="barra-app">ContaMoto</div>
        {/* Se usa el componente como si fuera una etiqueta HTML */}
        <RegistroGastos />
      {/* Cierra el marco */}
      </div>
    {/* Cierra el contenedor */}
    </main>
  // Cierra el return
  );
// Cierra el componente App
}
