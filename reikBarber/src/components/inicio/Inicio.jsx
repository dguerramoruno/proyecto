import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './inicio.css';

import imagen1 from "../../assets/imagen1.jpg";
import imagen2 from "../../assets/imagen2.jpg";
import imagen3 from "../../assets/imagen3.jpg";
import imagen4 from "../../assets/imagen4.jpg";

const Inicio = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create a Leaflet map instance
    const map = L.map(mapRef.current).setView([41.33870516986494, 1.9971958128236817], 15);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker
    L.marker([41.33870516986494 ,1.9971958128236817]).addTo(map);
     
    return () => {
      // Clean up Leaflet instance on unmount
      map.remove();
    };
  }, []);

  return (
    <div>
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

      {/* Mapa interactivo */}
      <div id="mapa" ref={mapRef} />
    </div>
  );
};

export default Inicio;
