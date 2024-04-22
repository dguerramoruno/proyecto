const connection = require("../utils/database");
connection.ping();

class Reservation {
  constructor(userId, date, service, stylist) {
    this.userId = userId;
    this.date = date;
    this.service = service;
    this.stylist = stylist;
  }

  save() {
    connection.query(
      "INSERT INTO reservations (user_id,date,service,stylist) VALUES ( ? ? ? ? )",
      [this.userId, this.date, this.service, this.stylist],
      (error, results, fields) => {
        if (error) {
          console.error("Error al guardar la reserva:", error);
          return;
        }
        console.log("Reserva guardada correctamente");
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
}
module.exports = Reservation;
