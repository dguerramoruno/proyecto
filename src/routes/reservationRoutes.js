const express = require("express")
const router = express.Router();
const reservationController = require('../controllers/reservationController')

router.post('/users',reservationController.createReservation)

module.exports = router