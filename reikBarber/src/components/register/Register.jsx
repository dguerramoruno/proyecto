import { useRef, useState } from "react";
import './Register.css';
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaUserAlt, FaLock } from 'react-icons/fa'; // Importar iconos

const Register = () => {
  const ref = useRef();
  const [errors, setErrors] = useState({}); // Estado para almacenar errores

  const handleRegister = async () => {
    const form = ref.current;
    const formData = new FormData(form);
    const values = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    // Validaciones
    const newErrors = {};

    if (values.name.length < 6) {
      newErrors.name = "El nombre y apellido debe tener al menos 6 caracteres";
    }

    if (values.username.length < 4) {
      newErrors.username = "El nombre de usuario debe tener al menos 4 caracteres";
    }

    if (!values.email.includes("@")) {
      newErrors.email = "Email no válido";
    }

    if (values.phone.length !== 10 || !/^\d+$/.test(values.phone)) {
      newErrors.phone = "Número de teléfono inválido";
    }

    if (values.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(values.password)) {
      newErrors.password = "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número";
    }

    // Actualizar estado de errores
    setErrors(newErrors);

    // Realizar el registro si no hay errores
    if (Object.keys(newErrors).length === 0) {
      const response = await fetch('http://localhost:3000/create_users', {
        method: 'POST', 
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values), 
      });

      // Lógica para manejar la respuesta del servidor
    }
  }

  return (
    <div className="register-container">
      <h2>Regístrate</h2>
      <form className="register-form" onSubmit={e => e.preventDefault()} ref={ref}>
        <div className="form-group">
          <label htmlFor="name"><FaUser /> Nombre y apellidos</label>
          <input id="name" type="text" name="name" required />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email"><FaEnvelope /> Email</label>
          <input id="email" type="email" name="email" required />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone"><FaPhone /> Numero de teléfono</label>
          <input id="phone" type="text" name="phone" required />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="username"><FaUserAlt /> Usuario</label>
          <input id="username" type="text" name="username" required />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password"><FaLock /> Contraseña</label>
          <input id="password" type="password" name="password" minLength="6" required />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-actions">
          <button onClick={(e) => {e.preventDefault(); handleRegister();}} type="submit">Registrar</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
