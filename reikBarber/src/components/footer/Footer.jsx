import React from "react"
import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="footer">
      <div >
      ©Reik Barber Studio <span>&nbsp;&nbsp;</span>  +34 617 012 945
       <br></br> <Link to="/cookies">Política de cookies</Link>
      </div>
    </footer>
  );
};

export default Footer;
