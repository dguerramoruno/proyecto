const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
//Definimos las rutas
app.use(routes)

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});