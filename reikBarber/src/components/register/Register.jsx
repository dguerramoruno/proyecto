import { useRef, useState } from "react";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{6,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{9}$/; // Suponiendo que el teléfono debe ser de 10 dígitos
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    // Al menos 8 caracteres, al menos una letra y al menos un número
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    const form = ref.current;
    const formData = new FormData(form);
    const values = {};
    const newErrors = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

  
    if (!validateName(values.name)) {
      newErrors.name = "El nombre y apellidos deben contener al menos 6 caracteres y no contener números.";
    }

    if (!validateEmail(values.email)) {
      newErrors.email = "ingresa un correo electrónico válido.";
    }

    if (!validatePhone(values.phone)) {
      newErrors.phone = "ingresa un número de teléfono válido.";
    }

    if (!validateName(values.username)) {
      newErrors.username = "El nombre de usuario debe contener al menos 6 caracteres y no contener números.";
    }

    if (!validatePassword(values.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const response = await fetch('http://localhost:3000/create_users', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values), 
    });

    if (!response.ok) {
      console.error('Error en la creación del usuario');
    }
    form.reset();
    navigate('/login');
  };

  return (
    <div className="register">
    <h2>Regístrate</h2>
    <form onSubmit={e => e.preventDefault()} ref={ref}> 
      <label htmlFor="name">Nombre y apellidos:</label>
      <input id="name" type="text" name="name" required />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" type="text" name="email" required />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="tlf">Número de teléfono:</label>
      <input id="tlf" type="text" name="phone" required />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label htmlFor="user">Usuario:</label>
      <input id="user" type="text" name="username" required />
      {errors.username && <p className="error">{errors.username}</p>}

      <label htmlFor="password">Contraseña:</label>
      <input id="password" type="password" name="password" required />
      {errors.password && <p className="error">{errors.password}</p>}

      <Link to="/login">Login</Link>

      <button onClick={(e) => {
        e.preventDefault();
        handleRegister();
      }} type="submit">Registrar</button>
    </form>      
  </div>
  );
};

export default Register;
