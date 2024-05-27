const connection = require("../utils/database");
connection.ping();

class Reservation {
  constructor(day, hour, client_id, barber_id) {
    this.day = day;
    this.hour = hour; // Asegúrate de asignar correctamente los valores en el constructor
    this.client_id = client_id;
    this.barber_id = barber_id;
  }
  formatDate(date) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  save(callback) {
    const formattedDay = this.formatDate(this.day); // Formatear la fecha aquí

    connection.query(
      "INSERT INTO reservations (day, hour, client_id, barber_id) VALUES (?, ?, ?, ?)",
      [formattedDay, this.hour, this.client_id, this.barber_id],
      (error, results, fields) => {
        if (error) {
          console.error("Error al guardar la reserva:", error);
          return callback(error);
        }
        console.log("Reserva guardada correctamente");
        callback(null, results);
      }
    );
  }

  static findAll(callback) {
    connection.query("SELECT * FROM reservations", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todas las reservas:", error);
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  static findById(id, callback) {
    connection.query(
      "SELECT * FROM reservations WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener la reserva por ID:", error);
          return callback(error, null);
        }
        if (results.length === 0) {
          return callback(null, null);
        }
        const reservation = results[0];
        callback(null, reservation);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query(
      "DELETE FROM reservations WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.error("Error al borrar la reserva por ID:", error);
          return callback(error, null);
        }
        if (results.affectedRows === 0) {
          return callback(null, null);
        }
        callback(null, results);
      }
    );
  }

  static findByClientId(client_id, callback) {
    connection.query(
      "SELECT * FROM reservations WHERE client_id = ?",
      [client_id],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener las reservas por client_id:", error);
          return callback(error, null);
        }
        callback(null, results);
      }
    );
  }
  static findByDay(day, callback) {
    console.log(day)
    connection.query(
      "SELECT hour FROM reservations WHERE day = ?",
      [day],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener las reservas por día:", error);
          return callback(error, null);
        }
        callback(null, results);
      }
    );
  }
}

module.exports = Reservation;
