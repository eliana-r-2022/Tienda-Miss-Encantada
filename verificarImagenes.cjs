const fs = require("fs");
const path = require("path");

// JSON con tus productos (puedes importarlo o pegarlo aquí)
const productos = [
  { "id": "1",  "imagen": "/img-trajes/img_1.png" },
  { "id": "2",  "imagen": "/img-trajes/img_2.jpg" },
  { "id": "3",  "imagen": "/img-trajes/img_3.png" },
  { "id": "4",  "imagen": "/img-trajes/img_4.png" },
  { "id": "5",  "imagen": "/img-trajes/img_5.png" },
  { "id": "6",  "imagen": "/img-trajes/img_6.png" },
  { "id": "7",  "imagen": "/img-trajes/img_7.png" },
  { "id": "8",  "imagen": "/img-trajes/img_8.png" },
  { "id": "9",  "imagen": "/img-trajes/img_9.png" },
  { "id": "10", "imagen": "/img-trajes/img_10.png" },
  { "id": "11", "imagen": "/img-trajes/img_11.png" },
  { "id": "12", "imagen": "/img-trajes/img_12.jpg" },
  { "id": "13", "imagen": "/img-trajes/img_13.jpg" },
  { "id": "14", "imagen": "/img-trajes/img_14.png" },
  { "id": "15", "imagen": "/img-trajes/img_15.png" },
  { "id": "16", "imagen": "/img-trajes/img_16.png" },
  { "id": "17", "imagen": "/img-trajes/img_17.png" },
  { "id": "18", "imagen": "/img-trajes/img_18.png" },
  { "id": "19", "imagen": "/img-trajes/img_19.png" },
  { "id": "20", "imagen": "/img-trajes/img_20.png" },
  { "id": "21", "imagen": "/img-trajes/img_21.png" }
];

// Ruta base de la carpeta public/img-trajes
const basePath = path.join(__dirname, "public");

let faltantes = [];

productos.forEach((p) => {
  const rutaImagen = path.join(basePath, p.imagen);
  if (!fs.existsSync(rutaImagen)) {
    faltantes.push(p.imagen);
  }
});

if (faltantes.length === 0) {
  console.log("✅ Todas las imágenes existen en /public/img-trajes");
} else {
  console.log("⚠️ Faltan las siguientes imágenes:");
  faltantes.forEach((img) => console.log(" - " + img));
}
