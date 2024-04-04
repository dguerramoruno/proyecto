import React from "react"
import { Link } from "react-router-dom"

const Inicio = () => {
  return (
    <div>
      
      <Link to="/reservar">
        <button>Reservar</button>
      </Link>
    </div>
  );
};

export default Inicio;