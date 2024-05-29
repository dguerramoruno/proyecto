import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import './Header.css';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = secureLocalStorage.getItem("role");

  useEffect(() => {
    let user = secureLocalStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      setUsername(user);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    secureLocalStorage.removeItem("user");
    secureLocalStorage.removeItem("id");
    secureLocalStorage.removeItem("role");
    setIsAuthenticated(false);
    setUsername('');
    setMenuOpen(false);
  };

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo de la aplicación" className="logo-image" />
      </div>
      <nav>
        <ul className={`menu ${menuOpen ? 'show' : ''}`}>
           <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/reservar">Reservar</Link></li>
          <li><Link to="/misReservas">Mis Reservas</Link></li>
          <li><Link to="/contactanos">Contáctanos</Link></li>

          
          {isAuthenticated ? (
            <>
              {userRole === "barber" && (
                <li>
                  <Link to="/crearBarber">Crear Barbero</Link>
                </li>
                
              )}
              {userRole === "barber" && (
                <li>
                <Link to="/crearCorte">Crear Corte</Link>
              </li>
                
              )}
             
              
              <li>
                <div>
                  <Link onClick={toggleMenu} className='login-icon'>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" /> {username}
                  </Link>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className='login-icon'>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />Inicia sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {menuOpen && (
        <div className="dropdown-menu">
          <button onClick={logoutAndRedirect} className="logout-button lg">Cerrar sesión</button>
        </div>
      )}
    </header>
  );
}

export default Header;
