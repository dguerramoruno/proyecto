const { request, response } = require('express')
const Reservation = require('../models/reservation')

const createReservation = (request, response) => {
  const { userId, date, service, stylist } = request.body;
  const newReservation = new Reservation(userId, date, service, stylist);

  newReservation.save((err) => {
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

// Método para obtener todas las reservas
const getAllReservations = (request, response) => {
  Reservation.findAll({}, (err, reservations) => {
    if (err) {
      console.error("Error al obtener todas las reservas:", err);
      return response.status(500).json({ message: "Error al obtener las reservas" });
    }
    response.status(200).json({ reservations });
  });
};

module.exports = { createReservation, getReservationById, getAllReservations };