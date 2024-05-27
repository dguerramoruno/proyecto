const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reservationController = require('../controllers/reservationController');

// Rutas para el controlador de usuarios
router.post('/create_users', userController.createUser);
router.post('/login',userController.login);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);


// Rutas para el controlador de reservas
router.post('/create_reservations', reservationController.createReservation);
router.get('/reservations/reservationById/:id', reservationController.getReservationById);
router.get('/reservations', reservationController.getAllReservations);
router.delete('/reservations/delete', reservationController.deleteReservationById);
router.get('/reservations/client',reservationController.getReservationsByClientId);
router.get('/reservations/reserved-hours', reservationController.getReservedHours);
module.exports = router;