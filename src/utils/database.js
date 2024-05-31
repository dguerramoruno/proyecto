const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "UvTGdPkwYPxySAISRRMiWGepprfQMnjM",
  database: "railway",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar la base de datos");
  } else {
    console.log("connexion establecida con la base de datos");
  }
});

module.exports = connection;
