import React from 'react';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" className="logo" />
      </div>
      <nav>
        <ul className="menu">
          <li><a href="/inicio">Inicio</a></li>
          <li><a href="/reservar">Reservar</a></li>
          <li><a href="/misReservas">Mis reservas</a></li>
          <li><a href="/contactanos">Contactanos</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
