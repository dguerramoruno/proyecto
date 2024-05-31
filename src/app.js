const fs = require('fs');
const https = require('https');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();

const privateKey = fs.readFileSync('./ssl/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('./ssl/selfsigned.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())
//Definimos las rutas
app.use(routes)

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

// Crea el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Inicia el servidor HTTPS en el puerto 443
httpsServer.listen(8080, () => {
  console.log('Servidor HTTPS corriendo en el puerto 8080');
});
