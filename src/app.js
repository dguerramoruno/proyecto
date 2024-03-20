const http  = require('node:http')
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')
const reservationRoutes = require('./routes/reservationRoutes')


const desiredPort = porcess.env.PORT ?? 1234

const server = http.createServer((req,res) => {
    res.end('Hola mundo')
})