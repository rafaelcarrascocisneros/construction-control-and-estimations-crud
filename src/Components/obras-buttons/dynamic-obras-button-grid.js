import React, { useState, useEffect } from 'react';
import './button-grid.css';
import { supabase } from "C:/Users/Client/Desktop/crud-estimaciones/src/index.js"

const DynamicButtonGrid = () => {
  const [data, setData] = useState([]);

  const [obra, setObra] = useState("Obra")
  const [avance, setAvance] = useState("0%")

  const goToCasas = () => {
      window.location.href = "/casas"
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from('obras')
      .select('*')
    
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      setData(data);
    }
  }

  const handleClick = (item) => {
    // Do something when button is clicked, e.g.:
    goToCasas();
  };

  return (
    <div className="obras-button-grid-container">
      {data.map((item) => (
        <button
          key={item.id}
          className="obra-button"
          onClick={() => handleClick(item)}
        >
          <span>{item.clave}</span>
          <span>{((item.avance)*100).toFixed(2) + "%"}</span>
        </button>
      ))}
    </div>
  );
};

export default DynamicButtonGrid;
