import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/footer';
import './App.css';
import Login from './components/login/Login';
import Inicio from './components/inicio/Inicio';

function App() {
  // Aquí puedes usar useState si necesitas algún estado en tu aplicación

  return (
   
      <div className="App">
        <Header />
        <main>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/inicio" component={Inicio} />
            </Switch>
          </Router>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;
