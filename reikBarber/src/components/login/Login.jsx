import React from "react"
import './Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className="login">
        <h2>Inicia sessión</h2>
        <form>
            <label htmlFor ="Usuario"> Usuario </label>
            <input type = "text" name="Usuario" required></input>
            <label htmlFor ="Contraseña"> Contraseña </label>
            <input type= "password" name="Contraseña" required/>
           
            <Link to="/register">Registrarme</Link>

            <button type="submit"> Login </button>
            

        </form>      
    </div>
  );
};

export default Login;
