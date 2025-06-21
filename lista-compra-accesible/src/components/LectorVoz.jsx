import { useEffect, useState } from "react";

function LectorVoz({ total, dineroDisponible }) {
  const [vocesDisponibles, setVocesDisponibles] = useState([]);
  const [vozSeleccionada, setVozSeleccionada] = useState(null);

  const diferencia = dineroDisponible - total;
  const esSuficiente = diferencia >= 0;

  // Cargar voces al iniciar
  useEffect(() => {
    const cargarVoces = () => {
      const voces = speechSynthesis.getVoices();
      const vocesES = voces.filter((v) => v.lang.startsWith("es"));

      setVocesDisponibles(vocesES);

      // Si no hay una voz seleccionada, elegimos una preferida
      if (!vozSeleccionada && vocesES.length > 0) {
        const preferida =
          vocesES.find((v) => v.name.includes("Google")) || vocesES[0];
        setVozSeleccionada(preferida);
      }
    };

    // Esperar a que se carguen las voces (en algunos navegadores es asíncrono)
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.onvoiceschanged = cargarVoces;
      cargarVoces();
    }
  }, []);

  const leerResumen = () => {
    const mensaje = `El total de la compra es ${total.toFixed(2)} euros. 
      Usted tiene ${dineroDisponible.toFixed(2)} euros disponibles. 
      ${esSuficiente ? "Le alcanza el dinero." : "No le alcanza el dinero."}`;

    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = vozSeleccionada?.lang || "es-ES";

    if (vozSeleccionada) {
      utterance.voice = vozSeleccionada;
    }

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 text-center space-y-4">
      <div>
        <label className="block mb-1 font-medium">Selecciona la voz</label>
        <select
          onChange={(e) => {
            const voice = vocesDisponibles.find((v) => v.name === e.target.value);
            setVozSeleccionada(voice);
          }}
          value={vozSeleccionada?.name || ""}
          className="w-full sm:w-auto p-2 border rounded-lg"
        >
          {vocesDisponibles.map((voz) => (
            <option key={voz.name} value={voz.name}>
              {voz.name} ({voz.lang})
            </option>
          ))}
        </select>
      </div>

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
// Permite seleccionar una voz y leer el total de la compra y el dinero disponible.
// Utiliza la API de Speech Synthesis del navegador para leer el texto en voz alta.