// src/utils/getImageUrl.js
export function getImageUrl(nombreArchivo) {
  // Si no hay url, devolvemos una imagen por defecto local
  if (!nombreArchivo) return "/img-trajes/default.png";

  // Si la url ya es completa y raw.githubusercontent, la devolvemos tal cual (por si acaso)
  if (nombreArchivo.startsWith("https://raw.githubusercontent.com/")) {
    return nombreArchivo;
  }

  // Si la url es tipo github.com con blob, la convertimos a raw.githubusercontent
  if (nombreArchivo.startsWith("https://github.com/")) {
    // Ejemplo de url que recibimos:
    // https://github.com/eliana-r-2022/Tienda-Miss-Encantada/blob/main/public/img-trajes/img_1.png?raw=true

    // Extraemos el path después de "github.com/"
    const partes = nombreArchivo.split("github.com/")[1].split("/blob/");
    // partes[0] = "eliana-r-2022/Tienda-Miss-Encantada"
    // partes[1] = "main/public/img-trajes/img_1.png?raw=true"

    if (partes.length === 2) {
      // Quitamos posibles query params ?raw=true
      const pathLimpio = partes[1].split("?")[0];
      return `https://raw.githubusercontent.com/${partes[0]}/${pathLimpio}`;
    }
  }

  // Si no es url completa, asumimos que es solo el nombre del archivo, construimos la url raw:
  return `https://raw.githubusercontent.com/eliana-r-2022/Tienda-Miss-Encantada/main/public/img-trajes/${nombreArchivo}`;
}

