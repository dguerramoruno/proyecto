import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import './reservar.css';
import secureLocalStorage from 'react-secure-storage';
registerLocale('es', es);
setDefaultLocale('es');

const Reservar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [reservedHours, setReservedHours] = useState([]);
  const clientId = secureLocalStorage.getItem("id"); // ID del cliente (puedes cambiarlo según tu lógica)
  const [barberId] = useState(1); // Por el momento solo hay un usuario barbero

  // Simulando una solicitud al backend para obtener las horas disponibles
  useEffect(() => {
    const fetchedAvailableHours = [
      { day: 1, start: "16:00", end: "20:30" }, // Lunes
      { day: 2, start: "16:00", end: "20:30" }, // Martes
      { day: 3, start: "16:00", end: "20:30" }, // Miércoles
      { day: 4, start: "10:00", end: "20:30" }, // Jueves
      { day: 5, start: "10:00", end: "20:30" }, // Viernes
      { day: 6, start: "10:00", end: "19:30" }  // Sábado
    ];
    setAvailableHours(fetchedAvailableHours);
  }, []);

  // Obtener horas reservadas del backend cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      const selectedDay = selectedDate.toISOString().split('T')[0];
      console.log(selectedDate)
      fetch(`http://localhost:3000/reservations/reserved-hours?day=${selectedDay}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.reservedHours)
          setReservedHours(data.reservedHours);
        })
        .catch(error => {
          console.error("Error al obtener las horas reservadas:", error);
        });
    }
  }, [selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const filterDate = date => {
    const selectedDay = date.getDay();
    return selectedDay !== 0; // Deshabilita domingos
  };

  const filterTime = time => {
    if (!selectedDate) return false;

    const selectedDay = selectedDate.getDay();
    const selectedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (selectedDay === 0) return false; // Deshabilitar selección si es domingo

    const dayHours = availableHours.find(hour => hour.day === selectedDay);
    if (!dayHours) return false;
    const startTime = new Date(`1970-01-01T${dayHours.start}`);
    const endTime = new Date(`1970-01-01T${dayHours.end}`);
    const selectedDateTime = new Date(`1970-01-01T${selectedTime}`);

    // Deshabilitar si está fuera del rango o si ya está reservado
    const isWithinRange = selectedDateTime >= startTime && selectedDateTime <= endTime;
    const isReserved = reservedHours.includes(selectedTime);
    return isWithinRange && !isReserved;
  };

  const handleReservation = () => {
    if (!selectedDate) {
      alert("Por favor, selecciona una fecha y hora.");
      return;
    }

    const reservationData = {
      day: selectedDate.toISOString().split('T')[0],
      hour: selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      client_id: clientId,
      barber_id: barberId
    };
    console.log(reservationData.day,reservationData.hour)

    fetch('http://localhost:3000/create_reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservationData)
    })
      .then(response => {
        if (response.ok) {
          alert("Reserva creada exitosamente");
          console.log(JSON.stringify(reservationData))
          // Aquí puedes agregar lógica adicional si la reserva se crea con éxito
        } else {
          throw new Error("Error al crear la reserva");
        }
      })
      .catch(error => {
        console.log(reservationData)
        console.error("Error al crear la reserva:", error);
        alert("Hubo un error al crear la reserva. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div className="containerR">
      <div className="datepicker-container">
        <h3>Selecciona una fecha y hora:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy HH:mm"
          inline 
          showTimeSelect 
          timeFormat="HH:mm"
          timeIntervals={30} 
          filterDate={filterDate}
          filterTime={filterTime}
        />
      </div>
      <button className="botonRe" onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default Reservar;
