import React, { useState } from "react";
import CasasButtons from "../Components/casas-buttons/casas-buttons";
import AddCasaModal from "../Components/modals/AddCasaModal";
import InputGrid from "../Components/input-grid/input-grid";

export default function Casas() {

    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <h1>Casas</h1>
            <button 
                    className="agregar-obra" 
                    onClick={handleOpenModal}
                >
                    Casa Nueva +
            </button>
            <AddCasaModal 
                isOpen={isOpen} 
                onClose={handleCloseModal}
            />
            <CasasButtons/>
        </>
    )
}