const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "cfgs",
  password: "ira491",
<<<<<<< HEAD
  database: "barber",
=======
  database: "proyecto",
>>>>>>> 78b60f171a38a3f22ecbffe82c54ac9c81a302ee
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar la base de datos");
  } else {
    console.log("connexion establecida con la base de datos");
  }
});

module.exports = connection;
