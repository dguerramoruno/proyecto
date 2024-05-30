import { useRef, useState } from "react";
import './createCorte.css';
import { useNavigate } from "react-router-dom";

const CreateCorte = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{6,}$/;
    return nameRegex.test(name);
  };

  const handleCreate = async () => {
    const form = ref.current;
    const formData = new FormData(form);
    const values = {};
    const newErrors = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    if (!validateName(values.name)) {
      newErrors.name = "El nombre del corte debe contener al menos 6 caracteres y no contener números.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const response = await fetch('http://localhost:3000/create_styles', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(values), 
    });

    if (!response.ok) {
      console.log(values),
      console.error('Error en la creación del corte');
    } else {
      setSuccessMessage('Corte creado correctamente');
      form.reset();
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/inicio'); 
      }, 3000); 
    }
  };

  return (
    <div className="create-cut">
      <h2>Crear Nuevo Corte</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={e => e.preventDefault()} ref={ref}> 
        <label htmlFor="name">Nombre del corte:</label>
        <input id="name" type="text" name="name" required />
        {errors.name && <p className="error">{errors.name}</p>}

        <button onClick={(e) => {
          e.preventDefault();
          handleCreate();
        }} type="submit">Crear</button>
      </form>      
    </div>
  );
};

export default CreateCorte;
