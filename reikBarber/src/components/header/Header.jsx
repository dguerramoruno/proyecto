import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import './Header.css'
import secureLocalStorage from 'react-secure-storage';

const Header = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    let user = secureLocalStorage.getItem("user");
    if(user){
      setIsAuthenticated(true)
    }
  },[isAuthenticated])
  
  const handleLogout = () => {
    secureLocalStorage.removeItem("user")
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
