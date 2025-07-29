const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "img-trajes");

fs.readdir(carpeta, (err, archivos) => {
  if (err) {
    console.error("Error leyendo la carpeta:", err);
    return;
  }

  archivos.forEach((archivo) => {
    const extension = path.extname(archivo); 
    const nombre = path.basename(archivo, extension); 

 
    const nuevoNombre = `${nombre.toLowerCase()}${extension.toLowerCase()}`;
    const viejoPath = path.join(carpeta, archivo);
    const nuevoPath = path.join(carpeta, nuevoNombre);


    if (archivo !== nuevoNombre) {
      fs.rename(viejoPath, nuevoPath, (err) => {
        if (err) {
          console.error("Error renombrando:", err);
        } else {
          console.log(`Renombrado: ${archivo} → ${nuevoNombre}`);
        }
      });
    }
  });
});
