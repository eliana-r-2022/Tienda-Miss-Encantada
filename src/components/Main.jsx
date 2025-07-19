import React from "react";
import "../styles//Main.css";
import SliderPasarela from "./SliderPasarela";

const imagenesGimnasia = [
  "/img04.jpg",
  "https://cdn.pixabay.com/photo/2018/03/13/18/40/rsg-3223320_1280.jpg",
  "https://images.pexels.com/photos/6160353/pexels-photo-6160353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/6160363/pexels-photo-6160363.jpeg",
  "https://images.pexels.com/photos/6160379/pexels-photo-6160379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];


const imagenesPatinaje = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
];


function Main() {
  return (
    <main className="main-contenedor">
      <h1 style={{ marginTop: "100px", marginBottom: "100px", textAlign: "center" }}>
        Trajes para Competiciones Deportivas Artísticas
      </h1>
      <p style={{ fontSize: "20px", textAlign: "center" }}>
        <i>Trabajamos con indumentaria especializada para actividades competitivas</i>
      </p>
      <p style={{ fontSize: "20px", textAlign: "center" }}>
        <i>Vestuarios para gimnastas y patinadoras</i>
      </p>

      {/* Primera fila de imágenes */}
        <div style={{ marginTop: "200px" }}>
          <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Gimnasia Rítmica y Artística</h2>
          <SliderPasarela imagenes={imagenesGimnasia} />
        </div>

      {/* Segunda fila de imágenes */}
      <div style={{ marginTop: "100px" }}>
        <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Patinaje Artístico</h2>
        <SliderPasarela imagenes={imagenesPatinaje} />
      </div>
    </main>
  );
}

export default Main;
