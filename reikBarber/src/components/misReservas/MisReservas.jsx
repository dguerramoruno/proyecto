import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import './MisReservas.css';

const MisReservas = () => {
  const [reservas, setReservas] = useState([
    { id: 1, dia: '2024-05-21', hora: '14:00', nombre: 'Juan Pérez' },
    { id: 2, dia: '2024-05-22', hora: '16:00', nombre: 'Ana García' },
    { id: 3, dia: '2024-05-23', hora: '18:00', nombre: 'Luis Martínez' },
  ]);

  const handleCancelarReserva = (id) => {
    setReservas(reservas.filter(reserva => reserva.id !== id));
  };

  const columns = [
    {
      name: 'Día',
      selector: row => row.dia,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: row => row.hora,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
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
