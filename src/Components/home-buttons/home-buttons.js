import React, { useState } from "react";
import "C:/Users/Client/Desktop/crud-estimaciones/src/Components/home-buttons/home-buttons.css"

function HomeButtons() {

    const goToObras = () => {
        window.location.href = "/obras"
    }

    const goToReportes = () => {
        window.location.href = "/"
    }


    return(
        <div className="home-button-grid-container">
            <button className="home-button" onClick={goToObras}>
                Captura
            </button>
            <button className="home-button" onClick={(goToReportes)}>
                Reportes
            </button>
	    </div>
    )
}

export default HomeButtons;