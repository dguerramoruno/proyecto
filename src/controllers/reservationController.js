const { request, response } = require('express');
const Reservation = require('../models/reservation');

const createReservation = (request, response) => {
  const { day, hour, client_id, barber_id,style_id } = request.body;
  const newReservation = new Reservation(day, hour, client_id, barber_id,style_id);
  newReservation.save((err, results) => {
    if (err) {
      console.error("Error al crear reserva:", err);
      return response.status(500).json({ message: "Error al crear la reserva" });
    }
    response.status(201).json({ message: "Reserva creada exitosamente" });
  });
};

const getReservationById = (request, response) => {
  const reservationId = request.params.id;
  
  Reservation.findById(reservationId, (err, reservation) => {
    if (err) {
      console.error("Error al obtener la reserva por ID:", err);
      return response.status(500).json({ message: "Error al obtener la reserva" });
    }
    if (!reservation) {
      return response.status(404).json({ message: "Reserva no encontrada" });
    }
    response.status(200).json({ reservation });
  });
};

const getReservedHours = (request, response) => {
  const { day } = request.query;
  
  // Supongamos que el día está en formato "yyyy-MM-dd"
  Reservation.findByDay(day, (err, reservations) => {
    if (err) {
      console.error("Error al obtener las horas reservadas:", err);
      return response.status(500).json({ message: "Error al obtener las horas reservadas" });
    }
    const reservedHours = reservations.map(reservation => reservation.hour);
    response.status(200).json({ reservedHours });
  });
};

const getAllReservations = (request, response) => {
  Reservation.findAll((err, reservations) => {
    if (err) {
      console.error("Error al obtener todas las reservas:", err);
      return response.status(500).json({ message: "Error al obtener las reservas" });
    }
    response.status(200).json({ reservations });
  });
};

const deleteReservationById = (request, response) => {
  const {reservationId} = request.query;

  Reservation.deleteById(reservationId, (err, result) => {
    if (err) {
      console.error("Error al borrar la reserva por ID:", err);
      return response.status(500).json({ message: "Error al borrar la reserva" });
    }
    if (!result) {
      return response.status(404).json({ message: "Reserva no encontrada" });
    }
    response.status(200).json({ message: "Reserva borrada exitosamente" });
  });
};

const getReservationsByClientId = (request, response) => {
  const {clientId} = request.query;
  console.log(clientId)
  Reservation.findByClientId(clientId, (err, reservations) => {
    if (err) {
      console.error("Error al obtener las reservas por client_id:", err);
      return response.status(500).json({ message: "Error al obtener las reservas" });
    }
    response.status(200).json({ reservations });
  });
};

module.exports = { 
  createReservation, 
  getReservationById, 
  getAllReservations, 
  deleteReservationById, 
  getReservationsByClientId,
  getReservedHours 
};
