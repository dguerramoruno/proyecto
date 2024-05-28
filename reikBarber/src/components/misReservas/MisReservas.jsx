import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './MisReservas.css';
import secureLocalStorage from 'react-secure-storage';

const MisReservas = () => {
  const userId = secureLocalStorage.getItem("id");
  const userRole = secureLocalStorage.getItem("role"); // Supongamos que tienes guardado el rol del usuario

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (userRole === "barber") {
      // Si el usuario es un barbero, obtén todas las reservas
      fetch('http://localhost:3000/reservations')
        .then(response => response.json())
        .then(data => {
          setReservas(data.reservations);
        })
        .catch(error => {
          console.error("Error al obtener las reservas:", error);
        });
    } else {
      // Si el usuario es un cliente, obtén solo las reservas asociadas a su ID
      fetch(`http://localhost:3000/reservations/client?clientId=${userId}`)
        .then(response => response.json())
        .then(data => {
          setReservas(data.reservations);
        })
        .catch(error => {
          console.error("Error al obtener las reservas:", error);
        });
    }
  }, [userId, userRole]);

  const handleCancelarReserva = (id) => {
    fetch(`http://localhost:3000/reservations/delete?reservationId=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Reserva borrada exitosamente");
          setReservas(reservas.filter(reserva => reserva.id !== id));
        } else {
          throw new Error("Error al borrar la reserva");
        }
      })
      .catch(error => {
        console.error("Error al borrar la reserva:", error);
        alert("Hubo un error al borrar la reserva. Por favor, inténtalo de nuevo.");
      });
  };

  const columns = [
    {
      name: 'Día',
      selector: row => row.day,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: row => row.hour,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <button className="botonR" onClick={() => handleCancelarReserva(row.id)}>Cancelar</button>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>{userRole === "barber" ? "Todas las reservas" : "Mis Reservas"}</h2>
      <DataTable
        columns={columns}
        data={reservas}
        pagination
        highlightOnHover
        striped
        noDataComponent="No hay reservas disponibles"
      />
    </div>
  );
}

export default MisReservas;
