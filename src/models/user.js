const connection = require('../utils/database')
const bcrypt = require('bcrypt');

class User {
    constructor(username, email,phone,name,password) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.password = password;
    }

    save(callback) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                console.error("Error al encriptar la contraseña:", err);
                return callback(err, null);
            }
            connection.query('INSERT INTO users (username, email, phone_number, name, password) VALUES (?, ?, ?, ?, ?)', [this.username, this.email, this.phone, this.name, hash], (error, results, fields) => {
                if (error) {
                    console.error("Error al crear usuario:", error);
                    return callback(error, null);
                }
                console.log("Usuario guardado correctamente");
                callback(null, results.insertId);
            });
        });
    }
    static findAll(callback) {
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error("Error al obtener todos los usuarios:", error);
                return callback(error, null);
            }
            callback(null, results);
        });
    }
    static authenticate(username, password) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
                if (error) {
                    console.error("Error al autenticar usuario:", error);
                    reject(error);
                }
                if (results.length === 0) {
                    resolve({ success: false, message: "Nombre de usuario no encontrado" });
                }
                const user = results[0];
                // Verificar la contraseña con bcrypt
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error("Error al comparar contraseñas:", err);
                        reject(err);
                    }
                    if (!isMatch) {
                        resolve({ success: false, message: "Contraseña incorrecta" });
                    }
                    resolve({ success: true, user });
                    console.log(user) 
                });
            });
        });
    }

    static findById(id, callback) {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
            if (error) {
                console.error("Error al obtener el usuario por ID:", error);
                return callback(error, null);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            callback(null, results[0]);
        });
    }
}
module.exports = User