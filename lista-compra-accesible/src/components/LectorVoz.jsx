function LectorVoz({ total, dineroDisponible }) {
  const diferencia = dineroDisponible - total;
  const esSuficiente = diferencia >= 0;

  const leerResumen = () => {
    const mensaje = `El total de la compra es ${total.toFixed(2)} euros. 
      Usted tiene ${dineroDisponible.toFixed(2)} euros disponibles. 
      ${esSuficiente ? "Le alcanza el dinero." : "No le alcanza el dinero."}`;

    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = "es-ES"; // español de España
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 text-center">
      <button
        onClick={leerResumen}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        🔊 Leer resumen
      </button>
    </div>
  );
}

export default LectorVoz;
// Este componente permite al usuario escuchar un resumen de la compra actual.
// Incluye el total de la compra, el dinero disponible y si es suficiente o no.