import "../styles/SliderPasarela.css";

function SliderPasarela({ imagenes }) {
  return (
    <div className="slider-pasarela">
      <div className="slider-track">
        {[...imagenes, ...imagenes].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`img-${index}`}
            className="pasarela-img"
          />
        ))}
      </div>
    </div>
  );
}

export default SliderPasarela;

