const User = require('../models/user')

exports.createUser = (req,res) => {
    const {username,email,password} = req.body;
    const newUser = new User(username,email,password)

    newUser.save((err) => {
        if(err){
            console.error("Error al crear usuario:",err)
            return res.status(500).json({message:'Error al crear usuario'})
        }
        res.status(201).json({message:"Usuario creado exitosamente"})
    })
}