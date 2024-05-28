const connection = require('../utils/database')
const bcrypt = require('bcrypt');

class Style {
    constructor(id,name) {
        this.username = username;
        this.name = name;       
    }
    static findAll(callback) {
        connection.query('SELECT * FROM styles', (error, results, fields) => {
            if (error) {
                console.error("Error al obtener todos los usuarios:", error);
                return callback(error, null);
            }
            callback(null, results);
        });
    }
}

module.exports = Style