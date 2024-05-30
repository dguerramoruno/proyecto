import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import './reservar.css';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from "react-router-dom";
registerLocale('es', es);
setDefaultLocale('es');

const Reservar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [availableHours, setAvailableHours] = useState([]);
  const [reservedHours, setReservedHours] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const clientId = secureLocalStorage.getItem("id"); // ID del cliente (puedes cambiarlo según tu lógica)
  const navigate = useNavigate();

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

  // Obtener los barberos del backend
  useEffect(() => {
    fetch('http://localhost:3000/barbers')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setBarbers(data);
        setSelectedBarber(data[0].id); // Seleccionar el primer barbero por defecto
      })
      .catch(error => {
        console.error("Error al obtener los barberos:", error);
      });
  }, []);

  // Obtener los estilos del backend
  useEffect(() => {
    fetch('http://localhost:3000/styles')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStyles(data);
        setSelectedStyle(data[0].id); // Seleccionar el primer estilo por defecto
      })
      .catch(error => {
        console.error("Error al obtener los estilos:", error);
      });
  }, []);

  // Obtener horas reservadas del backend cuando se selecciona una fecha
  useEffect(() => {
    getRefreshedData(selectedDate);
  }, [selectedDate]);

  const getRefreshedData = (date) => {
    if (date) {
      const selectedDay = date.toISOString().split('T')[0];
      fetch(`http://localhost:3000/reservations/reserved-hours?day=${selectedDay}`)
        .then(response => response.json())
        .then(data => {
          setReservedHours(data.reservedHours.map((time) => {
            const [hour, minutes] = time.split(':');
            return new Date(1970, 0, 1, hour, minutes);
          }));
        })
        .catch(error => {
          console.error("Error al obtener las horas reservadas:", error);
        });
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleBarberChange = event => {
    setSelectedBarber(event.target.value);
  };

  const handleStyleChange = event => {
    setSelectedStyle(event.target.value);
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
    const isReserved = reservedHours.some(
      reservedTime => reservedTime.getHours() === selectedDateTime.getHours() && reservedTime.getMinutes() === selectedDateTime.getMinutes()
    );
    return isWithinRange && !isReserved;
  };

  const handleReservation = () => {
    if (!clientId) { // Verifica si el cliente está logueado
      alert("Debes iniciar sesión para hacer una reserva.");
      navigate("/login"); // Redirige a la página de inicio de sesión
      return;
    }
    if (!selectedDate || !selectedBarber || !selectedStyle) {
      alert("Por favor, selecciona una fecha, hora, barbero y estilo.");
      return;
    }

    const reservationData = {
      day: selectedDate.toISOString().split('T')[0],
      hour: selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      client_id: clientId,
      barber_id: selectedBarber,
      style_id: selectedStyle
    };

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
          getRefreshedData(selectedDate);
        } else {
          throw new Error("Error al crear la reserva");
        }
      })
      .catch(error => {
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
          excludeTimes={reservedHours}
          timeIntervals={30} 
          filterDate={filterDate}
          filterTime={filterTime}
          minDate={new Date()} // Establecer la fecha mínima seleccionable como hoy
          highlightDates={[{ "highlighted": true, "date": new Date() }]} // Resaltar y deshabilitar días anteriores al actual
        />
      </div>
      <div className="barber-select-container">
        <h3>Selecciona un barbero:</h3>
        <select value={selectedBarber} onChange={handleBarberChange}>
          {barbers.map(barber => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      </div>
      <div className="style-select-container">
        <h3>Selecciona un estilo:</h3>
        <select value={selectedStyle} onChange={handleStyleChange}>
        {styles.map(style => (
            <option key={style.id} value={style.id}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
      <button className="botonRe" onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default Reservar;
