const User = require("../models/user");
const db = require('../utils/database');

const createUser = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User(username, email, password);
  console.log(req.body);
  newUser.save((err) => {
    if (err) {
      console.error("Error al crear usuario:", err);
      return res.status(500).json({ message: "Error al crear usuario" });
    }
    res.status(201).json({ message: "Usuario creado exitosamente" });
  });
};
const getUserById = (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";
  const values = [userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al obtener el usuario por ID:", err);
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ user: result[0] });
  });
};
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener todos los usuarios:", err);
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
    res.status(200).json({ users: result });
  });
};
module.exports = { createUser, getUserById, getAllUsers };
