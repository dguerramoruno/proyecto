import { useRef } from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // Importar iconos de usuario y contraseña

const Login = () => {
  const ref = useRef();

  const handleLogin = async () => {
    const form = ref.current;
    const formData = new FormData(form);
    const values = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    console.log(values);
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values), 
    });
  };

  return (
    <div className="login-container">
      <h2>Inicia sesión</h2>
      <form className="login-form" onSubmit={(e) => {e.preventDefault()}} ref={ref}>
        <div className="form-group">
          <label htmlFor="Usuario"><FaUser /> Usuario</label>
          <input type="text" name="Usuario" required />
        </div>
        <div className="form-group">
          <label htmlFor="Contraseña"><FaLock /> Contraseña</label>
          <input type="password" name="Contraseña" required />
        </div>
        <div className="form-actions">
          <button onClick={(e) => {e.preventDefault(); handleLogin();}} type="submit">Login</button>
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
