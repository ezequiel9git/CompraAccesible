import { idsPictogramas } from "./idsPictogramas";
import { aliasPictogramas } from "./aliasPictogramas";

export async function obtenerPictogramaUrl(nombreProducto) {
  // 1. Comprobar si hay un ID específico
  if (idsPictogramas[nombreProducto]) {
    const id = idsPictogramas[nombreProducto];
    const urlImagen = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;

    const test = await fetch(urlImagen, { method: "HEAD" });
    if (test.ok) return urlImagen;
  }

  // 2. Alias textual si no hay ID
  const nombreAlias = aliasPictogramas[nombreProducto] || nombreProducto;
  const query = encodeURIComponent(nombreAlias.trim().toLowerCase());

  try {
    const respuesta = await fetch(
      `https://api.arasaac.org/api/pictograms/es/search/${query}`
    );
    const datos = await respuesta.json();

    if (Array.isArray(datos) && datos.length > 0) {
      const id = datos[0]._id;
      const urlImagen = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;

      const test = await fetch(urlImagen, { method: "HEAD" });
      if (test.ok) return urlImagen;
    }
  } catch (error) {
    console.error("Error al obtener pictograma:", error);
  }

  // 3. Imagen de respaldo si todo falla
  return "/imagen-no-disponible.png";
}
