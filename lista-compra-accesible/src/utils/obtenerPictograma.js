import { aliasPictogramas } from "./aliasPictogramas";

export async function obtenerPictogramaUrl(nombreProducto) {
  // Aplica alias si existe uno, si no usa el nombre tal cual
  const nombreAlias = aliasPictogramas[nombreProducto] || nombreProducto;
  const query = encodeURIComponent(nombreAlias.trim().toLowerCase());

  try {
    const respuesta = await fetch(
      `https://api.arasaac.org/api/pictograms/es/search/${query}`
    );

    const datos = await respuesta.json();

    if (Array.isArray(datos) && datos.length > 0) {
      const id = datos[0]._id;

      // URL de imagen PNG a 500px
      const urlImagen = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;

      // Comprobar si la imagen existe antes de retornarla
      const test = await fetch(urlImagen, { method: "HEAD" });
      if (test.ok) {
        return urlImagen;
      }
    }
  } catch (error) {
    console.error("Error al obtener pictograma:", error);
  }

  // Imagen de respaldo si no hay resultado o error
  return "/imagen-no-disponible.png";
}
