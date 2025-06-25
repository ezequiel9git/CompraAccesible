import { useState, useEffect } from "react";
import { categorias } from "../categorias";
import { obtenerPictogramaUrl } from "../utils/obtenerPictograma";

function SelectorVisual({ onProductoSeleccionado }) {
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);

  const [pictogramasCategoria, setPictogramasCategoria] = useState({});
  const [pictogramasSubcategoria, setPictogramasSubcategoria] = useState({});
  const [pictogramasProducto, setPictogramasProducto] = useState({});

  const productos =
    categoriaActual && subcategoriaActual
      ? categorias[categoriaActual][subcategoriaActual]
      : [];

  useEffect(() => {
    const cargar = async () => {
      const nuevos = {};
      for (const nombre of Object.keys(categorias)) {
        const url = await obtenerPictogramaUrl(nombre);
        nuevos[nombre] = url;
      }
      setPictogramasCategoria(nuevos);
    };
    cargar();
  }, []);

  useEffect(() => {
    if (!categoriaActual) return;

    const cargar = async () => {
      const nuevos = {};
      for (const nombre of Object.keys(categorias[categoriaActual])) {
        const url = await obtenerPictogramaUrl(nombre);
        nuevos[nombre] = url;
      }
      setPictogramasSubcategoria(nuevos);
    };
    cargar();
  }, [categoriaActual]);

  useEffect(() => {
    const cargar = async () => {
      if (!productos || productos.length === 0) return;

      const nuevos = {};
      for (const producto of productos) {
        const url = await obtenerPictogramaUrl(producto);
        nuevos[producto] = url;
      }
      setPictogramasProducto(nuevos);
    };

    cargar();
  }, [subcategoriaActual]);

  const handleSeleccion = async (producto) => {
    const pictograma = pictogramasProducto[producto] || (await obtenerPictogramaUrl(producto));
    onProductoSeleccionado({
      nombre: producto,
      pictograma,
    });
  };

  const renderBoton = (nombre, imagen) => (
    <button
      key={nombre}
      onClick={() => {
        if (!categoriaActual) setCategoriaActual(nombre);
        else if (!subcategoriaActual) setSubcategoriaActual(nombre);
        else handleSeleccion(nombre);
      }}
      className="w-24 text-center bg-white shadow rounded-xl p-2"
    >
      <div className="w-full h-24 bg-gray-100 rounded mb-1 flex items-center justify-center overflow-hidden">
        {imagen ? (
          <img src={imagen} alt={nombre} className="w-full h-full object-contain" />
        ) : (
          <span className="text-xs text-gray-500">Cargando...</span>
        )}
      </div>
      <span className="text-xs">{nombre}</span>
    </button>
  );

  return (
    <div className="mt-6 max-w-4xl mx-auto text-center">
      {!categoriaActual ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Selecciona una categoría</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(categorias).map((cat) =>
              renderBoton(cat, pictogramasCategoria[cat])
            )}
          </div>
        </>
      ) : !subcategoriaActual ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Subcategorías de {categoriaActual}</h2>
          <div className="mb-4">
            <button
              onClick={() => setCategoriaActual(null)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded-lg"
            >
              ← Volver a categorías
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(categorias[categoriaActual]).map((subcat) =>
              renderBoton(subcat, pictogramasSubcategoria[subcat])
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Productos: {subcategoriaActual}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {productos.map((producto) =>
              renderBoton(producto, pictogramasProducto[producto])
            )}
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setSubcategoriaActual(null)}
              className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1 px-3 rounded-lg"
            >
              ← Volver a subcategorías
            </button>
            <button
              onClick={() => {
                setCategoriaActual(null);
                setSubcategoriaActual(null);
              }}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded-lg"
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
