import { useState, useEffect } from "react";
import ProductInput from "./components/ProductInput";
import ProductList from "./components/ProductList";
import DineroDisponible from "./components/DineroDisponible";
import LectorVoz from "./components/LectorVoz";
import SelectorVisual from "./components/SelectorVisual";
import { obtenerPictogramaUrl } from "./utils/obtenerPictograma";

function App() {
  const [productos, setProductos] = useState([]);
  const [dineroDisponible, setDineroDisponible] = useState(0);

  // Cargar estado desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("estadoApp");
    if (data) {
      const { productos, dineroDisponible } = JSON.parse(data);
      setProductos(productos);
      setDineroDisponible(dineroDisponible);
    }
  }, []);

  // Guardar estado en localStorage
  useEffect(() => {
    localStorage.setItem("estadoApp", JSON.stringify({ productos, dineroDisponible }));
  }, [productos, dineroDisponible]);

  // Añadir producto manualmente desde ProductInput
  const agregarProducto = (producto) => {
    const nuevoProducto = { ...producto, id: Date.now() };
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  // Añadir producto desde selector visual (con pictograma)
  const agregarDesdeSelectorVisual = async (nombre) => {
    const pictograma = await obtenerPictogramaUrl(nombre);
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio: 0,
      pictograma,
    };
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarLista = () => {
    const confirmado = window.confirm("¿Estás seguro de que quieres vaciar toda la lista?");
    if (confirmado) {
      setProductos([]);
    }
  };

  const total = productos.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de la Compra Accesible</h1>

      <ProductInput onAddProduct={agregarProducto} />

      <SelectorVisual onProductoSeleccionado={agregarDesdeSelectorVisual} />

      <ProductList productos={productos} onDelete={eliminarProducto} />

      <div className="text-center mt-4">
        <button
          onClick={vaciarLista}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Vaciar lista
        </button>
      </div>

      <DineroDisponible
        dineroDisponible={dineroDisponible}
        setDineroDisponible={setDineroDisponible}
        total={total}
      />

      <LectorVoz
        total={total}
        dineroDisponible={dineroDisponible}
      />
    </div>
  );
}

export default App;

// Este es el componente principal de la aplicación.
// Carga el estado inicial desde localStorage y permite agregar productos a la lista.
// También guarda el estado actualizado en localStorage cada vez que cambia.
// Utiliza el componente ProductInput para permitir al usuario ingresar nuevos productos.