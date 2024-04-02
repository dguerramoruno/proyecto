import React from "react";
import './Login.css';
const Login = () => {
  return (
    <div className="login">
        <h2>Inicia sessión</h2>
        <form>
            <label htmlFor ="Usuario"> Usuario </label>
            <input type = "text" name="Usuario" required></input>
            <label htmlFor ="Contraseña"> Contraseña </label>
            <input type= "password" name="Contraseña" required/>

            <a href="/Register">Registrarme</a>

            <button type="submit"> Login </button>
            

        </form>      
    </div>
  );
};

export default Login;
