import { useState } from "react";

function ProductInput({ onAddProduct }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const buscarPictograma = async (palabra) => {
    try {
      const res = await fetch(`https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(palabra)}`);
      const data = await res.json();
      if (data.length > 0) {
        const id = data[0]._id;
        return `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;
      }
    } catch (e) {
      console.error("Error al buscar pictograma:", e);
    }
    return null; // fallback a null
  };

  const handleAdd = async () => {
    if (!nombre || !precio) return;

    const pictograma = await buscarPictograma(nombre);
    const producto = {
      id: crypto.randomUUID(),
      nombre,
      precio: parseFloat(precio),
      pictograma,
    };

    onAddProduct(producto);
    setNombre("");
    setPrecio("");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4 grid gap-3 md:grid-cols-3 sm:grid-cols-1 items-end w-full max-w-2xl mx-auto">
      <div>
        <label className="block font-medium mb-1">Producto</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Ej: Pan"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Precio (€)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Ej: 1.50"
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full transition"
      >
        Agregar
      </button>
    </div>
  );
}

export default ProductInput;
// Este componente permite al usuario ingresar un producto con su nombre y precio.
// Al hacer clic en "Agregar", busca un pictograma relacionado con el nombre del producto
// y lo agrega a la lista de productos.
// Utiliza la API de Arasaac para buscar pictogramas y muestra un botón estilizado con Tailwind CSS.
// El componente maneja el estado de los campos de entrada y llama a la función onAddProduct
// proporcionada por el componente padre para agregar el nuevo producto a la lista.
// El uso de crypto.randomUUID() garantiza que cada producto tenga un ID único.
// El componente es responsivo y se adapta a diferentes tamaños de pantalla utilizando clases de Tailwind CSS.
// El diseño incluye un fondo blanco, bordes redondeados y sombras para un aspecto moderno.
// Además, se incluyen etiquetas y placeholders para mejorar la accesibilidad y usabilidad.
// El componente se puede integrar fácilmente en una aplicación más grande que maneje una lista de compras accesible.