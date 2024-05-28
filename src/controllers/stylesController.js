const Style = require('../models/style');
const findAll = (request, response) => {
    Style.findAll((err, results) => {
      if (err) {
        console.error("Error al obtener todos los estilos los estilos", err);
        return response.status(500).json({ message: "Error los estilos" });
      }
      response.status(200).json(results);
    });
  };
module.exports = { findAll };
