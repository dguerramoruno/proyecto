const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'cfgs',
    password: 'ira491',
    database: 'barber'
});

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
}
module.exports = User