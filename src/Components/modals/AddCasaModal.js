import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";
import { supabase } from "C:/Users/Client/Desktop/crud-estimaciones/src/index.js"

function AddCasaModal(props) {
  const [clave, setClave] = useState("");
  const [lotes, setLotes] = useState("");
  const [modelo, setModelo] = useState("");
  const [unidad, setUnidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [contratista, setContratista] = useState("");
  const [total, setTotal] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  async function pushData() {
    const { data, error } = await supabase
    .from('casas')
    .insert([
      { 
        clave_obra: "OBRAC#01",
        clave: clave,
        lotes: lotes,
        modelo: modelo,
        unidad: unidad,
        estado: 'No empezada',
        ubicacion: ubicacion,
        contratista: "CEMEX",
        importe_al_dia: 0,
        importe: total },
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    pushData();
    
    console.log("Submitted!");
    console.log(`Clave: ${clave}`);
    console.log(`Lotes: ${lotes}`);
    console.log(`Modelo: ${modelo}`);
    console.log(`Unidad: ${unidad}`);
    console.log(`Ubicación: ${clave}`);
    console.log(`Contratista: ${contratista}`);
    console.log(`Monto Total: ${total}`);

    setClave("");
    setLotes("");
    setModelo("");
    setUnidad("");
    setUbicacion("");
    setContratista("");
    setTotal("");
    props.onClose();
  };

  return props.isOpen ? (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal">
        <h1 className="obra-modal-header">Casa Nueva +</h1>
        <button className="modal-close" onClick={props.onClose}>
          X
        </button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-label" htmlFor="clave">
            Clave de Casa:
          </label>
          <input
            className="modal-input"
            type="text"
            id="clave"
            value={clave}
            onChange={(event) => setClave(event.target.value)}
          />
          <label className="modal-label" htmlFor="lotes">
            Lotes:
          </label>
          <input
            className="modal-input"
            type="text"
            id="lotes"
            value={lotes}
            onChange={(event) => setLotes(event.target.value)}
          />
          <label className="modal-label" htmlFor="modelo">
            Modelo:
          </label>
          <input
            className="modal-input"
            type="text"
            id="modelo"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
          />
          <label className="modal-label" htmlFor="unidad">
            Unidad:
          </label>
          <input
            className="modal-input"
            type="text"
            id="unidad"
            value={unidad}
            onChange={(event) => setUnidad(event.target.value)}
          />
          <label className="modal-label" htmlFor="ubicacion">
            Ubicación:
          </label>
          <input
            className="modal-input"
            type="text"
            id="ubicacion"
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
          {/* <label className="modal-label" htmlFor="contratista">
            Contratista:
          </label>
          <input
            className="modal-input"
            type="text"
            id="contratista"
            value={contratista}
            onChange={(event) => setContratista(event.target.value)}
          /> */}
          <label className="modal-label" htmlFor="total">
            Importe Total de Casa:
          </label>
          <input
            className="modal-input"
            type="text"
            id="total"
            value={total}
            onChange={(event) => setTotal(event.target.value)}
          />
          <button className="modal-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default AddCasaModal;
