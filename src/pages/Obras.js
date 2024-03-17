import React, { useState } from "react";
import DynamicButtonGrid from "../Components/obras-buttons/dynamic-obras-button-grid"
import AddObraModal from "../Components/modals/AddObraModal";
import './Obras.css';

export default function Obras() {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }
    
    return (
        <>
            <div className="page-title">
                <h1>Obras</h1>
                <button 
                    className="agregar-obra" 
                    onClick={handleOpenModal}
                >
                    Obra Nueva +
                </button>
            </div>
            <AddObraModal 
                isOpen={isOpen} 
                onClose={handleCloseModal}
            />
            {/* <ButtonGrid/> */}
            {/* <CasasButtons /> */}
            <DynamicButtonGrid/>
        </>
    )
}