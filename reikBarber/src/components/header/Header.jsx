import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importa el icono deseado
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" className="logo-image" />
      </div>
      <nav>
        <ul className="menu">
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/contactanos">Contactanos</Link></li>
          <li className="login-link"><Link to="/login" className='login-icon' ><FontAwesomeIcon icon={faUserCircle} size="2x" /> <span className='login-text'>Inicia sesión</span></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
