# ContaMoto — Componente React: Registro de gastos

Componente desarrollado en **React** para el proyecto ADSO **ContaMoto**, aplicación de control de ingresos, gastos y mantenimiento para motociclistas.

**Evidencias SENA:** GA7-220501096-AA3-EV01 y GA7-220501096-AA3-EV02
**Aprendiz:** Santiago Calvache Mora · **Ficha:** 3336142 · Análisis y Desarrollo de Software

## Qué hace el componente

- Registra gastos de la moto con categoría (combustible, mantenimiento, repuestos, parqueadero, otro), monto, fecha y descripción.
- Valida que el monto sea mayor que cero y que la fecha no sea futura.
- Muestra la lista de gastos y el total en pesos colombianos.
- Permite eliminar un gasto.
- Guarda los datos en el navegador (`localStorage`), así no se pierden al recargar.

## Conceptos de React usados

| Concepto | Dónde |
|---|---|
| Componentes funcionales | `RegistroGastos`, `TarjetaGasto`, `App` |
| Props | `TarjetaGasto` recibe `gasto` y `onEliminar` |
| Estado (`useState`) | lista de gastos y campos del formulario |
| Efectos (`useEffect`) | guardar en `localStorage` cuando cambia la lista |
| Eventos | `onSubmit`, `onChange`, `onClick` |
| Renderizado condicional y listas | mensaje de error, lista vacía, `map` con `key` |

## Cómo ejecutarlo

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abrir la dirección que muestra la consola (normalmente <http://localhost:5173>).

## Estructura

```text
src/
├── main.jsx                      # Punto de entrada: monta App en index.html
├── App.jsx                       # Marco tipo celular con la barra de ContaMoto
├── App.css
└── components/
    ├── RegistroGastos.jsx        # Componente de la evidencia (comentado línea por línea)
    └── RegistroGastos.css
```

## Video explicativo

[Ver video](https://youtu.be/ZiOh26koGHc)
