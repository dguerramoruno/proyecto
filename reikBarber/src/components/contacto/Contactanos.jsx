import React, { useState } from 'react';
import './contactanos.css';

const contactanos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu backend o realizar cualquier otra acción
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Texto:', texto);
    // También puedes reiniciar los campos del formulario después de enviar los datos si lo deseas
    setNombre('');
    setEmail('');
    setTexto('');
  };

  return (
    <div className="contact-container">
      <h2>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="message-container">
          <label htmlFor="texto">Mensaje:</label>
          <textarea
            id="texto"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default contactanos;