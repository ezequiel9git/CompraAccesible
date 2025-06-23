import { useState, useEffect } from "react";
import { categorias } from "../categorias";
import { obtenerPictogramaUrl } from "../utils/obtenerPictograma";

function SelectorVisual({ onProductoSeleccionado }) {
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);
  const [pictogramas, setPictogramas] = useState({});
  const productos =
    categoriaActual && subcategoriaActual
      ? categorias[categoriaActual][subcategoriaActual]
      : [];

  useEffect(() => {
    const cargarPictogramas = async () => {
      if (!productos || productos.length === 0) return;

      const nuevosPictogramas = {};
      for (const producto of productos) {
        const url = await obtenerPictogramaUrl(producto);
        nuevosPictogramas[producto] = url;
      }
      setPictogramas(nuevosPictogramas);
    };

    cargarPictogramas();
  }, [subcategoriaActual]);

  const handleSeleccion = async (producto) => {
    const pictograma = pictogramas[producto] || (await obtenerPictogramaUrl(producto));
    onProductoSeleccionado({
      nombre: producto,
      pictograma,
    });
  };

  return (
    <div className="mt-6">
      {!categoriaActual ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Selecciona una categoría</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.keys(categorias).map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaActual(categoria)}
                className="bg-blue-100 hover:bg-blue-200 rounded-xl p-4 text-center font-medium"
              >
                {categoria}
              </button>
            ))}
          </div>
        </>
      ) : !subcategoriaActual ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Subcategorías de {categoriaActual}</h2>
          <button
            onClick={() => setCategoriaActual(null)}
            className="text-sm text-gray-600 mb-2 underline"
          >
            ← Volver a categorías
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.keys(categorias[categoriaActual]).map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSubcategoriaActual(subcat)}
                className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-center font-medium"
              >
                {subcat}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Productos: {subcategoriaActual}</h2>
          <div className="flex flex-wrap gap-4">
            {productos.map((producto) => (
              <button
                key={producto}
                onClick={() => handleSeleccion(producto)}
                className="w-24 text-center bg-white shadow rounded-xl p-2"
              >
                <div className="w-full h-24 bg-gray-100 rounded mb-1 flex items-center justify-center overflow-hidden">
                  {pictogramas[producto] ? (
                    <img
                      src={pictogramas[producto]}
                      alt={producto}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">Cargando...</span>
                  )}
                </div>
                <span className="text-xs">{producto}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setSubcategoriaActual(null)}
              className="text-sm text-gray-600 underline"
            >
              ← Volver a subcategorías
            </button>
            <button
              onClick={() => {
                setCategoriaActual(null);
                setSubcategoriaActual(null);
              }}
              className="text-sm text-gray-600 underline"
            >
              ← Volver a categorías
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectorVisual;
