import React, { useState } from 'react';
import './contacto.css'; // Asegúrate de tener un archivo CSS para los estilos

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu backend o realizar cualquier otra acción
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);
    // Puedes agregar lógica adicional aquí, como enviar los datos a un servidor

    // Reiniciar los campos del formulario después de enviar los datos
    setNombre('');
    setEmail('');
    setMensaje('');
    // Mostrar un mensaje de confirmación al usuario
    setEnviado(true);
    // Puedes agregar un tiempo de espera y luego ocultar el mensaje de confirmación si lo deseas
  };

  return (
    <div className="contacto-container">
      <h2>Contactanos</h2>
      {enviado && <p className="enviado-message">¡Tu mensaje ha sido enviado!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(event) => setMensaje(event.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
