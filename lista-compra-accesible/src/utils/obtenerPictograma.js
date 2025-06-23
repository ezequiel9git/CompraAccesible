// src/utils/obtenerPictograma.js

export async function obtenerPictogramaUrl(nombreProducto) {
  const query = encodeURIComponent(nombreProducto.trim().toLowerCase());

  try {
    const respuesta = await fetch(
      `https://api.arasaac.org/api/pictograms/es/search/${query}`
    );

    const datos = await respuesta.json();

    if (Array.isArray(datos) && datos.length > 0) {
      const id = datos[0]._id;

      // Probar si existe una imagen PNG para ese ID
      const urlImagen = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;

      // Comprobamos que la imagen existe antes de retornarla
      const test = await fetch(urlImagen, { method: "HEAD" });
      if (test.ok) {
        return urlImagen;
      }
    }
  } catch (error) {
    console.error("Error al obtener pictograma:", error);
  }

  // Imagen de respaldo si falla
  return "/imagen-no-disponible.png"; // o deja null
}
