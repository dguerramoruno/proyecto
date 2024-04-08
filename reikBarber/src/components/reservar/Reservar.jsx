import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import './reservar.css';

registerLocale('es', es);
setDefaultLocale('es');

const Reservar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);

  // Simulando una solicitud al backend para obtener las horas disponibles
  useEffect(() => {
    // Aquí deberías hacer una solicitud al backend para obtener las horas disponibles
    // Supongamos que recibimos las horas disponibles en este formato:
    const fetchedAvailableHours = [
      { day: 1, start: "10:00", end: "20:30" }, // Lunes
      { day: 2, start: "10:00", end: "20:30" }, // Martes
      { day: 3, start: "10:00", end: "20:30" }, // Miércoles
      { day: 4, start: "10:00", end: "20:30" }, // Jueves
      { day: 5, start: "10:00", end: "20:30" }, // Viernes
      { day: 6, start: "10:00", end: "19:30" }  // Sábado
    ];
    setAvailableHours(fetchedAvailableHours);
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const filterTime = time => {
    if (!selectedDate) return false;
    const selectedDay = selectedDate.getDay(); 
    const selectedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

    // Verificar si la hora seleccionada está dentro del rango de horas disponibles para el día seleccionado
    const dayHours = availableHours.find(hour => hour.day === selectedDay);
    if (!dayHours) return false;
    const startTime = new Date(`1970-01-01T${dayHours.start}`);
    const endTime = new Date(`1970-01-01T${dayHours.end}`);
    const selectedDateTime = new Date(`1970-01-01T${selectedTime}`);
    return selectedDateTime >= startTime && selectedDateTime <= endTime;
  };

  return (
    <div className="container">
      <h3>Selecciona una fecha y hora :</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy HH:mm"
        inline 
        showTimeSelect 
        timeFormat="HH:mm"
        timeIntervals={30} 
        filterTime={filterTime}
      />
    </div>
  );
};

export default Reservar;
