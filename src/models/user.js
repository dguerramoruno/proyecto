const connection = require('../utils/database')
const bcrypt = require('bcrypt');

class User {
    constructor(username, email,phone,role,name,password) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    save(callback) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                console.error("Error al encriptar la contraseña:", err);
                return callback(err, null);
            }
            console.log(this.role)
        connection.query('INSERT INTO users (username, email, phone_number,role, name, password) VALUES (?, ?, ?, ?, ?,?)', [this.username, this.email, this.phone,this.role, this.name, hash], (error, results, fields) => {
                if (error) {
                    console.error("Error al crear usuario:", error);
                    return callback(error, null);
                }
                console.log("Usuario guardado correctamente");
                callback(null, results.insertId);
            });
        });
    }
    static findBarbers(callback) {
        connection.query('SELECT * FROM users WHERE role = "barber"', (error, results, fields) => {
            if (error) {
                console.error("Error al obtener los barberos:", error);
                return callback(error, null);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            console.log(results)
            callback(null, results);
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

    static async authenticate(username, password) {

        try {

            const queryPromise = new Promise((resolve, reject) => {
                connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
                    if (error) reject('error')
                    if (results.length === 0) reject('error')
                    
                    const [user] = results

                    resolve(user)
                })
            })

            const user = await queryPromise

            const passwordPromise = new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) reject('error')
                    if (!match) reject('error')

                    resolve(true)
                })
            })

            const match = await passwordPromise

            if (match) return user

            throw new Error('error')

        } catch(err) {
            return null
        }
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