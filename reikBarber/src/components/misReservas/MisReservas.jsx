import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './MisReservas.css';
import secureLocalStorage from 'react-secure-storage';

const MisReservas = () => {
  const userId = secureLocalStorage.getItem("id");
  const [reservas, setReservas] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/reservations/client?clientId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setReservas(data.reservations);
      })
      .catch(error => {
        console.error("Error al obtener las horas reservadas:", error);
      }); 
  }, [userId]);

  const handleCancelarReserva = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/reservations/delete?reservationId=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Reserva borrada exitosamente");
          // Aquí puedes agregar lógica adicional si la reserva se crea con éxito
        } else {
          throw new Error("Error al crear la reserva");
        }
      })
      .catch(error => {
        console.error("Error al borrar la reserva:", error);
        alert("Hubo un error al crear la reserva. Por favor, inténtalo de nuevo.");
      });
    setReservas(reservas.filter(reserva => reserva.id !== id));
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
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
      <h2>Mis Reservas</h2>
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
