import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  // Supongamos que isAuthenticated es un estado que indica si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Supongamos que username es el nombre de usuario del usuario autenticado
  const [username, setUsername] = useState('');

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí iría la lógica para cerrar la sesión
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <header className='header'>
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" className="logo-image" />
      </div>
      <nav>
        <ul className="menu">
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/contactanos">Contáctanos</Link></li>
          {isAuthenticated ? (
            <li className="login-link">
              <button onClick={handleLogout} className="logout-button">{username} (Cerrar sesión)</button>
            </li>
          ) : (
            <li className="login-link">
              <Link to="/login" className='login-icon'><FontAwesomeIcon icon={faUserCircle} size="2x" /> <span className='login-text'>Inicia sesión</span></Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
