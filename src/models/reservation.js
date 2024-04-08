const connection = require('../utils/database')



class Reservation {
    constructor(userId,date,service,stylist){
        this.userId = userId
        this.date = date
        this.service = service
        this.stylist = stylist
    }

    save(){
        connection.query('INSERT INTO reservations (user_id,date,service,stylist) VALUES ( ? ? ? ? )',[this.userId,this.date,this.service,this.stylist],(error,results,fields)=>{
            if(error){
                console.error("Error al guardar la reserva:",error)
                return
            }
            console.log("Reserva guardada correctamente")
        })
    }
}
module.exports = Reservation