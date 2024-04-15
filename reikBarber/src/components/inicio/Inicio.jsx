import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './inicio.css';

// Importa tus imágenes aquí
import imagen1 from "../../assets/imagen1.jpg";
import imagen2 from "../../assets/imagen2.jpg";
import imagen3 from "../../assets/imagen3.jpg";
import imagen4 from "../../assets/imagen4.jpg";

const Inicio = () => {
  return (
    <div>
      {/* Galería de imágenes */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div className="imagenes">
          <img src={imagen1} alt="Imagen 1" className="imageness"/>
        </div>
        <div className="imagenes">
          <img src={imagen2} alt="Imagen 2" className="imageness"/>
        </div>
        <div className="imagenes">
          <img src={imagen3} alt="Imagen 3" className="imageness"/>
        </div>
        <div className="imagenes">
          <img src={imagen4} alt="Imagen 4" className="imageness"/>
        </div>
        
      </Carousel>

      {/* Botón de Reservar */}
      <Link to="/reservar">
        <button>Reservar</button>
      </Link>
    </div>
  );
};

export default Inicio;
