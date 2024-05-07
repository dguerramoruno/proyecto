import React, { useState } from "react";
import './misReservas.css'; // Asegúrate de tener un archivo CSS para los estilos

const MisReservas = () => {
  // Supongamos que recibimos las reservas desde el backend en este formato:
  const [reservas, setReservas] = useState([
    { id: 1, dia: "2024-05-15", hora: "10:00" },
    { id: 2, dia: "2024-05-17", hora: "11:30" },
    { id: 3, dia: "2024-05-20", hora: "15:00" },
  ]);

  const cancelarReserva = (id) => {
    // Aquí deberías implementar la lógica para cancelar la reserva con el ID proporcionado
    console.log(`Reserva cancelada: ${id}`);
    // Después de cancelar la reserva, puedes actualizar la lista de reservas
    // Por ejemplo, eliminando la reserva cancelada de la lista
    const nuevasReservas = reservas.filter(reserva => reserva.id !== id);
    setReservas(nuevasReservas);
  };

  return (
    <div className="mis-reservas-container">
      <h2>Mis Reservas</h2>
      <table className="mis-reservas-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Cancelar</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{new Date(reserva.dia).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td>{reserva.hora}</td>
              <td>
                <button onClick={() => cancelarReserva(reserva.id)}>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisReservas;
