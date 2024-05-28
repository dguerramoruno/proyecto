const User = require("../models/user");
const db = require('../utils/database');

const createUser = (req, res) => {
  const { username, email,phone,name, password } = req.body;
  const newUser = new User(username, email,phone,name, password);
  console.log(username,email,phone,name,password)
  newUser.save((err) => {
    if (err) {
      console.error("Error al crear usuario:", err);
      return res.status(500).json({ message: "Error al crear usuario" });
    }
    res.status(201).json({ message: "Usuario creado exitosamente" });
  }); 
};
const login = async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password)

    if (!user) {
      return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
    }

    res.status(200).json({user});
  } catch(err) {
    console.error("Error al autenticar usuario:", err);
      return res.status(500).json({ message: "Error al autenticar usuario" });
  }

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

const getBarbers = async (req, res) => {
  try {
    User.findBarbers((error,results)=> {
      if(error){
        throw new Error(error)
      }else{
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error al obtener los barberos:', error);
    res.status(500).json({ message: 'Error al obtener los barberos' });
  }
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
module.exports = { createUser, getUserById, getAllUsers,login,getBarbers };
