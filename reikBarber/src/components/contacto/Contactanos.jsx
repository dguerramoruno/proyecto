import React, { useState } from 'react';
import './contactanos.css';

const Contactanos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [message, setMessage] = useState(''); // Estado para manejar mensajes de éxito o error

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/enviar-correo', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, mensaje: texto }),
      });

      if (response.ok) {
        setMessage('Correo electrónico enviado correctamente');
        setNombre(''); // Limpiar el campo de nombre
        setEmail(''); // Limpiar el campo de email
        setTexto(''); // Limpiar el campo de mensaje
      } else {
        setMessage('Error al enviar el correo electrónico');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      setMessage('Error al enviar el correo electrónico');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contactanos</h2>
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito o error */}
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
