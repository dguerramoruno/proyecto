const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reservationController = require('../controllers/reservationController');

// Rutas para el controlador de usuarios
router.post('/create_users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);

// Rutas para el controlador de reservas
router.post('/create_reservations', reservationController.createReservation);
router.get('/reservations/:id', reservationController.getReservationById);
router.get('/reservations', reservationController.getAllReservations);

module.exports = router;