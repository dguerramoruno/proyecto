const connection = require('../utils/database')
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password], (error, results, fields) => {
            if (error) {
                console.log("Error al crear usuarios:", error);
                return;
            }
            console.log("Usuario guardado");
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