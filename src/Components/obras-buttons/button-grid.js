import React, { useState } from "react";
import "C:/Users/Client/Desktop/crud-estimaciones/src/Components/obras-buttons/button-grid.css"
import CustomLink from "../CustomLink";

function ButtonGrid() {
    const [obra, setObra] = useState("Obra")
    const [avance, setAvance] = useState("0%")

    const goToCasas = () => {
        window.location.href = "/casas"
    }

    return(
        <div className="button-grid-container">
            <button className="button" onClick={goToCasas}>
                <span>{obra}</span>
                <span>{avance}</span>
            </button>
            <button className="button">
                <span>{obra}</span>
                <span>{avance}</span>
            </button>
            <button className="button">
                <span>{obra}</span>
                <span>{avance}</span>
            </button>
            <button className="button">
                <span>{obra}</span>
                <span>{avance}</span>
            </button>
	    </div>
    )
}

export default ButtonGrid;