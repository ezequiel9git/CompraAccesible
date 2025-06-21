import { useState, useEffect } from "react";
import ProductInput from "./components/ProductInput";
import ProductList from "./components/ProductList";
import DineroDisponible from "./components/DineroDisponible";


function App() {
  const [productos, setProductos] = useState([]);
  const [dineroDisponible, setDineroDisponible] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("estadoApp");
    if (data) {
      const { productos, dineroDisponible } = JSON.parse(data);
      setProductos(productos);
      setDineroDisponible(dineroDisponible);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("estadoApp", JSON.stringify({ productos, dineroDisponible }));
  }, [productos, dineroDisponible]);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

   const eliminarProducto = (id) => {
    const actualizados = productos.filter((p) => p.id !== id);
    setProductos(actualizados);
  };

  const vaciarLista = () => {
  setProductos([]);
};


  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de la Compra Accesible</h1>

      <ProductInput onAddProduct={agregarProducto} />

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
        total={productos.reduce((acc, p) => acc + p.precio, 0)}
      />
    </div>
  );
}

export default App;
// Este es el componente principal de la aplicación.
// Carga el estado inicial desde localStorage y permite agregar productos a la lista.
// También guarda el estado actualizado en localStorage cada vez que cambia.
// Utiliza el componente ProductInput para permitir al usuario ingresar nuevos productos.