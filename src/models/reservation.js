const connection = require("../utils/database");
connection.ping();

class Reservation {
  constructor(day, hour, client_id, barber_id) {
    this.day = day;
    this.hour = hour;
    this.client_id = client_id;
    this.barber_id = barber_id;
  }

  save() {
    connection.query(
      "INSERT INTO reservations (day,hour,client_id,barber_id) VALUES ( ? ? ? ? )",
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
