import { useState } from "react";

function PrecioModal({ producto, onConfirmar, onCancelar }) {
  const [precio, setPrecio] = useState("");
  const [kilos, setKilos] = useState("");
  const [unidades, setUnidades] = useState("");

  const manejarConfirmacion = () => {
    const valorPrecio = parseFloat(precio);
    const valorKilos = kilos ? parseFloat(kilos) : null;
    const valorUnidades = unidades ? parseInt(unidades, 10) : null;

    if (!isNaN(valorPrecio) && valorPrecio >= 0) {
      onConfirmar(
        valorPrecio,
        !isNaN(valorKilos) ? valorKilos : null,
        !isNaN(valorUnidades) ? valorUnidades : null
      );
    } else {
      alert("Introduce un precio válido.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Introduce el precio para:</h2>
        <div className="flex items-center gap-4 mb-4">
          {producto.pictograma && (
            <img src={producto.pictograma} alt={producto.nombre} className="w-16 h-16" />
          )}
          <p className="text-lg font-medium">{producto.nombre}</p>
        </div>

        <input
          type="number"
          step="0.01"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Precio (€)"
        />

        <input
          type="number"
          step="0.01"
          min="0"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Kilos (opcional)"
        />

        <input
          type="number"
          min="0"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Unidades (opcional)"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={manejarConfirmacion}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrecioModal;
