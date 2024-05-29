const connection = require("../utils/database");

const Style = require("../models/style");
const findAll = (request, response) => {
  Style.findAll((err, results) => {
    if (err) {
      console.error("Error al obtener todos los estilos los estilos", err);
      return response.status(500).json({ message: "Error los estilos" });
    }
    response.status(200).json(results);
  });
};

const createCorte = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const query =
    "INSERT INTO styles (name) VALUES (?)";
  connection.query(query, [name], (error, results) => {
    if (error) {
      console.error("Error al crear el corte:", error);
      return res.status(500).json({ error: "Error al crear el corte" });
    }

    res
      .status(201)
      .json({
        message: "Corte creado exitosamente",
        corteId: results.insertId,
      });
  });
};

module.exports = { findAll,createCorte };
