import Carousel from 'react-bootstrap/Carousel';

function CarouselBoots() {
  return (
    <div className="carousel-wrapper">
      <Carousel>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="/image-01.png"
            alt="Primera imagen"
          />
          <Carousel.Caption>
            <h3>Primera promoción</h3>
            <p>Descubrí nuestras ofertas exclusivas.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="/image-02.png"
            alt="Segunda imagen"
          />
          <Carousel.Caption>
            <h3>Segunda promoción</h3>
            <p>Productos seleccionados hasta 50% OFF.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="/image-03.png"
            alt="Tercera imagen"
          />
          <Carousel.Caption>
            <h3>Tercera promoción</h3>
            <p>Envíos gratis en compras mayores a $30.000</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselBoots;



