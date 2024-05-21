import { useRef } from "react"
import './Register.css'
import { Link } from "react-router-dom"
const Register = () => {

  const ref = useRef()

  const handleRegister = async () => {
    const form = ref.current
    const formData = new FormData(form)
    const values = {}

    for (const [key, value] of formData.entries()) {
      values[key] = value
    }
    const response = await fetch('http://localhost:3000/create_users', {
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values), 
    })
  }

  return (
    <div className="register">
        <h2>Registrate</h2>

        <form onSubmit={e => e.preventDefault()} ref={ref}  > 
            <label htmlFor ="name"> Nombre y apellidos </label>
            <input id='name' type = "text" name="name" required></input>

            <label htmlFor ="email"> Email </label>
            <input id='email' type = "text" name="email" required></input>

            <label htmlFor ="tlf"> Numero de teléfono </label>
            <input id='tlf' type="text" name="phone" required></input>

            <label htmlFor ="user"> Usuario </label>
            <input id='user' type = "text" name="username" required></input>

            <label htmlFor ="password"> Contraseña </label>
            <input id='password' type= "password" name="password" required/>

            <Link to="/login">Login</Link>

            <button onClick={(e) => {
              e.preventDefault()
              handleRegister()
            }} type="submit"> Registrar </button>
            
        </form>      
    </div>
  );
};

export default Register;