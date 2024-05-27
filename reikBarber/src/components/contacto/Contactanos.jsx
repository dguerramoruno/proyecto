import React, { useState } from 'react';
import './contactanos.css';

const Contactanos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/http://localhost:3000/contactanos/enviar-correo', { // Envía la solicitud a /api/enviar-correo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, mensaje: texto }),
      });

      if (response.ok) {
        console.log('Correo electrónico enviado correctamente');
        // Puedes mostrar un mensaje de éxito al usuario si lo deseas
      } else {
        console.error('Error al enviar el correo electrónico');
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  return (
    <div className="contact-container">
      <h2>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="message-container">
          <label htmlFor="texto">Mensaje: </label>
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

export default Contactanos;
