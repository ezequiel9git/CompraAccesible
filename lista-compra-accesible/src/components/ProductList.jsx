function ProductList({ productos, onDelete }) {
  const total = productos.reduce((acc, prod) => acc + prod.precio, 0);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Productos seleccionados</h2>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos en la lista.</p>
      ) : (
        <ul className="space-y-4">
          {productos.map((prod) => (
            <li
              key={prod.id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 flex-wrap"
            >
              <div className="flex items-center gap-4 flex-1 min-w-[60%]">
                {prod.pictograma && (
                  <img
                    src={prod.pictograma}
                    alt={prod.nombre}
                    className="w-16 h-16 object-contain"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">{prod.nombre}</p>
                  <p className="text-sm text-gray-600">{prod.precio.toFixed(2)} €</p>
                </div>
              </div>

              <button
                onClick={() => onDelete(prod.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-right mt-6 text-xl font-bold text-gray-800">
        Total: {total.toFixed(2)} €
      </div>
    </div>
  );
}

export default ProductList;
// Este componente muestra la lista de productos seleccionados.
// Permite eliminar productos de la lista y muestra el total acumulado.