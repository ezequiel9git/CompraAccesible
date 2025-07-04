import { useState, useEffect } from "react";
import ProductInput from "./components/ProductInput";
import ProductList from "./components/ProductList";
import DineroDisponible from "./components/DineroDisponible";
import LectorVoz from "./components/LectorVoz";
import SelectorVisual from "./components/SelectorVisual";
import PrecioModal from "./components/PrecioModal";

function App() {
  const [productos, setProductos] = useState([]);
  const [dineroDisponible, setDineroDisponible] = useState(0);
  const [productoPendiente, setProductoPendiente] = useState(null);

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
    setProductos((prev) => [...prev, { ...producto, id: producto.id || Date.now() }]);
  };

  const agregarDesdeSelectorVisual = (productoSinPrecio) => {
    setProductoPendiente(productoSinPrecio);
  };

  const confirmarPrecio = (precio, kilos, unidades) => {
    if (productoPendiente) {
      agregarProducto({
        ...productoPendiente,
        precio,
        kilos: kilos || null,
        unidades: unidades || null,
      });
      setProductoPendiente(null);
    }
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarLista = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar toda la lista?")) {
      setProductos([]);
    }
  };

  const total = productos.reduce((acc, p) => acc + (p.precio || 0), 0);

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de la Compra Accesible</h1>

      <ProductInput onAddProduct={agregarDesdeSelectorVisual} />

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

      <LectorVoz total={total} dineroDisponible={dineroDisponible} />

      {productoPendiente && (
        <PrecioModal
          producto={productoPendiente}
          onConfirmar={confirmarPrecio}
          onCancelar={() => setProductoPendiente(null)}
        />
      )}
    </div>
  );
}

export default App;
