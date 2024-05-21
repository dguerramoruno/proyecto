const express = require('express');
const routes = require('./routes/routes')
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())
//Definimos las rutas
app.use(routes)

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});