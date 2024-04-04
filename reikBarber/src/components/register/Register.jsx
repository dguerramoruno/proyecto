import React from "react"
import './Register.css'
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <div className="register">
        <h2>Registrate</h2>
        <form> 
            <label htmlFor ="name"> Nombre y apellidos </label>
            <input type = "text" name="Usuario" required></input>

            <label htmlFor ="email"> Email </label>
            <input type = "text" name="email" required></input>

            <label htmlFor ="tlf"> Numero de teléfono </label>
            <input type = "text" name="tlf" required></input>

            <label htmlFor ="Usuario"> Usuario </label>
            <input type = "text" name="Usuario" required></input>

            <label htmlFor ="Contraseña"> Contraseña </label>
            <input type= "password" name="Contraseña" required/>

            <Link to="/login">Login</Link>

            <button type="submit"> Registrar </button>
            
        </form>      
    </div>
  );
};

export default Register;