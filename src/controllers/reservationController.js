const { request, response } = require('express')
const Reservation = require('../models/reservation')

exports.createReservation = (request, response) => {
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

