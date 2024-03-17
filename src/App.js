import React from 'react';
import "./App.css"
import NavBar from './Components/nav-bar/nav-bar';
import Home from './pages/Home';
import Casas from './pages/Casas';
import Obras from './pages/Obras';
import Captura from './pages/Captura';
import { Route, Routes } from "react-router-dom" 

function App() {
  return ( 
      <>
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/obras" element={<Obras />}/>
            <Route path="/casas" element={<Casas />}/>
            <Route path="/captura" element={<Captura />}/>
          </Routes>
        </div>
        {/*<CasasButtons/>*/}
        {/* <ButtonGrid/> */}
        
      </>
  );
}

export default App;
