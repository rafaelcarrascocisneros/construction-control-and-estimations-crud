import React, { useState, useEffect } from "react";
import "./casas-buttons-grid.css"
import { supabase } from '../../index.js'

function CasasButtons() {
    const [data, setData] = useState([]);

    const [clave, setClave] = useState("Clave")
    const [ubicación, setUbicación] = useState("Ubicación")
    const [lotes, setLotes] = useState("Lotes")
    const [contratista, setContratista] = useState("Contratista")
    const [avance, setAvance] = useState("%Avance")

    const goToCaptura = () => {
        window.location.href = "/captura"
    }

    useEffect(() => {
        fetchData();
      }, []);
    
    async function fetchData() {
        const { data, error } = await supabase
            .from('casas')
            .select('*')
        
        if (error) {
            console.error(error)
        } else {
            console.log(data)
            setData(data);
        }
    }

    return(
        <div className="casas-button-grid">
            {data.map((item) => (
                <button
                    className="casa-button" 
                    key={item.id}
                    onClick={goToCaptura}
                >
                    <span className="text1">{item.clave}</span>
                    <span className="text2">{item.ubicacion}</span>
                    <span className="text3">{item.lotes}</span>
                    <span className="text4">{item.contratista}</span>
                    <span className="text5">{((item.avance)*100).toFixed(2) + "%"}</span>
                </button>
            ))}    
                
            {/* <button>Button 2</button>
            <button>Button 3</button>
            <button>Button 4</button>
            <button>Button 5</button> */}
        </div>
    )
}

export default CasasButtons;