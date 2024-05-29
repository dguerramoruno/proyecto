const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "barber2",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar la base de datos");
  } else {
    console.log("connexion establecida con la base de datos");
  }
});

module.exports = connection;
