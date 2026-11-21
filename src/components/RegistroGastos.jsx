// Importa los hooks useState (guardar datos que cambian) y useEffect (ejecutar efectos) desde React
import { useState, useEffect } from 'react';
// Importa la hoja de estilos propia del componente
import './RegistroGastos.css';

// Lista fija de categorías de gasto de un motociclista, se usa para llenar el selector
const CATEGORIAS = ['Combustible', 'Mantenimiento', 'Repuestos', 'Parqueadero', 'Otro'];
// Nombre de la llave con la que se guardan los gastos en el almacenamiento del navegador
const LLAVE_STORAGE = 'contamoto-gastos';

// Función auxiliar que da formato de pesos colombianos a un número (ej: 25000 -> $ 25.000)
const formatoCOP = (valor) =>
  // Intl.NumberFormat convierte el número a moneda COP sin decimales
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor);

// Función auxiliar que devuelve la fecha local de hoy en formato AAAA-MM-DD (el que usa <input type="date">)
const hoy = () => new Date().toLocaleDateString('en-CA');

// Componente hijo: muestra un solo gasto; recibe por props el gasto y la función para eliminarlo
function TarjetaGasto({ gasto, onEliminar }) {
  // Devuelve el JSX (la parte visual) de la tarjeta
  return (
    // Elemento de lista que contiene la tarjeta del gasto
    <li className="tarjeta-gasto">
      {/* Bloque izquierdo con la información del gasto */}
      <div>
        {/* Muestra la categoría del gasto en negrita */}
        <strong>{gasto.categoria}</strong>
        {/* Muestra la fecha y, si existe, la descripción separada por un punto */}
        <span className="detalle">{gasto.fecha}{gasto.descripcion && ` · ${gasto.descripcion}`}</span>
      {/* Cierra el bloque de información */}
      </div>
      {/* Bloque derecho con el valor y el botón de eliminar */}
      <div className="acciones">
        {/* Muestra el monto con formato de pesos */}
        <span className="monto">{formatoCOP(gasto.monto)}</span>
        {/* Botón que al hacer clic llama a onEliminar con el id de este gasto */}
        <button type="button" onClick={() => onEliminar(gasto.id)} aria-label="Eliminar gasto">✕</button>
      {/* Cierra el bloque de acciones */}
      </div>
    {/* Cierra el elemento de lista */}
    </li>
  // Cierra el return
  );
// Cierra el componente TarjetaGasto
}

// Componente principal: formulario para registrar gastos de la moto y lista con el total
export default function RegistroGastos() {
  // Estado con la lista de gastos; al iniciar lee lo guardado en localStorage (o una lista vacía)
  const [gastos, setGastos] = useState(() => JSON.parse(localStorage.getItem(LLAVE_STORAGE)) || []);
  // Estado del campo categoría del formulario, inicia en la primera categoría
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  // Estado del campo monto (texto que escribe el usuario)
  const [monto, setMonto] = useState('');
  // Estado del campo fecha, inicia con la fecha de hoy
  const [fecha, setFecha] = useState(hoy());
  // Estado del campo descripción (opcional)
  const [descripcion, setDescripcion] = useState('');
  // Estado del mensaje de error de validación (vacío = sin error)
  const [error, setError] = useState('');

  // Efecto que se ejecuta cada vez que cambia la lista de gastos
  useEffect(() => {
    // Guarda la lista en localStorage para que no se pierda al recargar la página
    localStorage.setItem(LLAVE_STORAGE, JSON.stringify(gastos));
  // El arreglo [gastos] indica que el efecto depende solo de la lista de gastos
  }, [gastos]);

  // Calcula el total sumando el monto de cada gasto con reduce, empezando en 0
  const total = gastos.reduce((suma, g) => suma + g.monto, 0);

  // Función que se ejecuta al enviar el formulario
  const registrarGasto = (evento) => {
    // Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault();
    // Convierte el texto del monto a número
    const valor = Number(monto);
    // Valida que el monto sea un número mayor que cero
    if (!valor || valor <= 0) {
      // Si no es válido, guarda el mensaje de error para mostrarlo
      setError('Ingrese un monto mayor que cero.');
      // Sale de la función sin registrar nada
      return;
    // Cierra la validación del monto
    }
    // Valida que la fecha no sea posterior a hoy
    if (fecha > hoy()) {
      // Si es una fecha futura, muestra el error correspondiente
      setError('La fecha no puede ser futura.');
      // Sale de la función sin registrar nada
      return;
    // Cierra la validación de la fecha
    }
    // Crea el objeto del nuevo gasto; Date.now() sirve como id único
    const nuevo = { id: Date.now(), categoria, monto: valor, fecha, descripcion: descripcion.trim() };
    // Agrega el nuevo gasto al inicio de la lista sin modificar la lista anterior
    setGastos([nuevo, ...gastos]);
    // Limpia el campo monto para el siguiente registro
    setMonto('');
    // Limpia el campo descripción
    setDescripcion('');
    // Borra cualquier mensaje de error anterior
    setError('');
  // Cierra la función registrarGasto
  };

  // Función que elimina un gasto según su id
  const eliminarGasto = (id) => {
    // filter crea una lista nueva sin el gasto cuyo id coincide
    setGastos(gastos.filter((g) => g.id !== id));
  // Cierra la función eliminarGasto
  };

  // Devuelve el JSX que se dibuja en la interfaz
  return (
    // Contenedor principal del componente
    <section className="registro-gastos">
      {/* Encabezado rojo de la pantalla de gastos */}
      <header className="encabezado">
        {/* Título de la pantalla */}
        <h2>Registro de gastos</h2>
        {/* Muestra el total gastado, calculado arriba */}
        <p>Total gastado: <strong>{formatoCOP(total)}</strong></p>
      {/* Cierra el encabezado */}
      </header>

      {/* Formulario; al enviarse ejecuta registrarGasto y noValidate deja las validaciones al componente */}
      <form className="formulario" onSubmit={registrarGasto} noValidate>
        {/* Etiqueta y selector de la categoría */}
        <label>Categoría
          {/* El valor viene del estado y onChange lo actualiza al elegir otra opción */}
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {/* map recorre las categorías y crea una opción por cada una; key identifica cada opción */}
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          {/* Cierra el selector */}
          </select>
        {/* Cierra la etiqueta de categoría */}
        </label>
        {/* Etiqueta y campo numérico del monto */}
        <label>Monto (COP)
          {/* Campo controlado: muestra el estado monto y lo actualiza con cada tecla */}
          <input type="number" min="0" placeholder="Ej: 25000" value={monto} onChange={(e) => setMonto(e.target.value)} />
        {/* Cierra la etiqueta de monto */}
        </label>
        {/* Etiqueta y campo de fecha */}
        <label>Fecha
          {/* Campo de fecha controlado; max impide elegir días futuros en el calendario */}
          <input type="date" max={hoy()} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        {/* Cierra la etiqueta de fecha */}
        </label>
        {/* Etiqueta y campo de texto de la descripción */}
        <label>Descripción (opcional)
          {/* Campo controlado para una nota corta, máximo 40 caracteres */}
          <input type="text" maxLength="40" placeholder="Ej: Tanqueo Terpel" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        {/* Cierra la etiqueta de descripción */}
        </label>
        {/* Renderizado condicional: el párrafo de error solo aparece si hay mensaje */}
        {error && <p className="error">{error}</p>}
        {/* Botón que envía el formulario */}
        <button type="submit">Registrar gasto</button>
      {/* Cierra el formulario */}
      </form>

      {/* Si no hay gastos muestra un aviso; si hay, muestra la lista */}
      {gastos.length === 0 ? (
        // Mensaje cuando la lista está vacía
        <p className="vacio">Aún no hay gastos registrados.</p>
      // Si la lista tiene elementos
      ) : (
        // Lista de gastos
        <ul className="lista">
          {/* Crea una TarjetaGasto por cada gasto y le pasa los datos y la función eliminar por props */}
          {gastos.map((g) => <TarjetaGasto key={g.id} gasto={g} onEliminar={eliminarGasto} />)}
        {/* Cierra la lista */}
        </ul>
      // Cierra el condicional
      )}
    {/* Cierra el contenedor principal */}
    </section>
  // Cierra el return
  );
// Cierra el componente RegistroGastos
}
