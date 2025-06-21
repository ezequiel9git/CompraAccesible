import { CheckCircle, XCircle } from "lucide-react";

function DineroDisponible({ dineroDisponible, setDineroDisponible, total }) {
  const diferencia = dineroDisponible - total;
  const esSuficiente = diferencia >= 0;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow p-4">
      <div className="grid gap-4 sm:grid-cols-2 items-end">
        <div>
          <label className="block font-medium mb-1">Dinero disponible (€)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={dineroDisponible}
            onChange={(e) => setDineroDisponible(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Diferencia:</p>
          <div className="flex items-center gap-2 mt-1">
            {esSuficiente ? (
              <CheckCircle className="text-green-600 w-6 h-6" />
            ) : (
              <XCircle className="text-red-600 w-6 h-6" />
            )}
            <p className={`text-xl font-bold ${esSuficiente ? "text-green-600" : "text-red-600"}`}>
              {esSuficiente ? "+" : "-"} {Math.abs(diferencia).toFixed(2)} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DineroDisponible;
// Este componente muestra el dinero disponible y la diferencia con el total de la lista.
// Permite al usuario ingresar el dinero disponible y muestra si es suficiente para cubrir el total de la lista.