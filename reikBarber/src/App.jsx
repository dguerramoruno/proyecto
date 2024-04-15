import React from 'react'
import { useState } from 'react'
import {  Route, Routes} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Cookies from './components/cookies/Cookies'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Reservar from './components/reservar/Reservar'
import './App.css'
import Inicio from './components/inicio/Inicio'
import Contactanos from './components/contacto/Contactanos'
import fondo from "./assets/fondoo.webp";

function App() {
  // Aquí puedes usar useState si necesitas algún estado en tu aplicación

  return (
   
      <div className="App">
        <Header />
        <main>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/inicio" element={<Inicio/>} />
              <Route path="/reservar" element={<Reservar/>} />
              <Route path="/contactanos" element={<Contactanos/>} />
              <Route path="/cookies" element={<Cookies/>} />
              
            
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;
