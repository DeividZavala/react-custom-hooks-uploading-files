import React  from 'react';
import Router from './Router';
import {Link} from "react-router-dom";
import './App.css';


export default function App (){

  return (
      <div className="App">

          <nav>
              <Link to="/">Inicio</Link>
              <Link to="/new">Nueva Chela</Link>
          </nav>
          <Router/>
      </div>
  )

}
