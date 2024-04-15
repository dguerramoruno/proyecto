const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Resto de la configuración de tu aplicación

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});