import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";
import { supabase } from "../../index.js"

function AddObraModal(props) {
  const [clave, setClave] = useState("");
  const [tipo, setTipo] = useState("");
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
    .from('obras')
    .insert([
      { clave: clave,
        tipo: tipo,
        estado: 'No empezada',
        monto_al_dia: '0',
        monto_total: parseFloat(total)},
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    pushData();
    
    console.log("Submitted!");
    console.log(`Clave: ${clave}`);
    console.log(`Tipo: ${tipo}`);
    console.log(`Monto Total: ${total}`);

    setClave("");
    setTipo("");
    setTotal("");
    props.onClose();
  };

  return props.isOpen ? (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal">
        <h1 className="obra-modal-header">Obra Nueva +</h1>
        <button className="modal-close" onClick={props.onClose}>
          X
        </button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-label" htmlFor="clave">
            Clave:
          </label>
          <input
            className="modal-input"
            type="text"
            id="clave"
            value={clave}
            onChange={(event) => setClave(event.target.value)}
          />
          <label className="modal-label" htmlFor="tipo">
            Tipo de Obra:
          </label>
          <input
            className="modal-input"
            type="text"
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
          />
          <label className="modal-label" htmlFor="total">
            Costo total:
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

export default AddObraModal;
