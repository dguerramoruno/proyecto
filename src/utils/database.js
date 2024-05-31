const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql://root:UvTGdPkwYPxySAISRRMiWGepprfQMnjM@viaduct.proxy.rlwy.net:23937/railway",
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
