import React from 'react'
import logo from '../../assets/logo.png'
import './Header.css'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <header className='header'>
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" className="logo" />
      </div>
      <nav>
        <ul className="menu">
          <li><Link to="/inicio">Inicio</Link></li>
          
          <li><Link to="/contactanos">Contactanos</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
