import {useRef} from "react"
import './Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  const ref = useRef()

  const handleLogin = async () => {
    const form = ref.current
    const formData = new FormData(form)
    const values = {}

    for (const [key, value] of formData.entries()) {
      values[key] = value
    }
    console.log(values)
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values), 
    })
  }

  return (
    <div className="login">
        <h2>Inicia sessión</h2>
        <form onSubmit={(e) => {e.preventDefault()}} ref={ref}>
            <label htmlFor ="Usuario"> Usuario </label>
            <input type = "text" name="Usuario" required></input>
            <label htmlFor ="Contraseña"> Contraseña </label>
            <input type= "password" name="Contraseña" required/>
           
            <Link to="/register">Registrarme</Link>

            <button onClick={(e) => {
              e.preventDefault()
              handleLogin()
              }} type="submit"> Login </button>
            

        </form>      
    </div>
  );
};

export default Login;
