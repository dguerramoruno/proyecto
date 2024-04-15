const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const reservationController = require('../controllers/reservationController')

router.post('/user',reservationController.createReservation)

module.exports = router;