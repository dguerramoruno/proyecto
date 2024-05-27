import { useRef,useState } from "react";
import secureStorage from "react-secure-storage";
import "./Login.css";
import { Link,useNavigate  } from "react-router-dom";

const Login = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const form = ref.current;
    const formData = new FormData(form);
    const values = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const { username,id } = data.user;
      console.log(id,username)
      secureStorage.setItem("user", username);
      secureStorage.setItem("id", id);
      setError(null);
      form.reset();
      navigate('/inicio');
      
    } else {
      setError("Usuario y/o contraseña incorrectos");
      console.error("Error al iniciar sesión");
    }
  };

  return (
    <div className="login">
      <h2>Inicia sessión</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={ref}
      >
        <label htmlFor="username"> Usuario </label>
        <input type="text" name="username" required></input>
        <label htmlFor="password"> Contraseña </label>
        <input type="password" name="password" required />
        {error && <p className="error">{error}</p>}
        <Link to="/register" className="la">Registrarme</Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          type="submit"
        >
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
};

export default Login;
