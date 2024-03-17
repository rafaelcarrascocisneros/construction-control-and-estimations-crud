import React, { useState, useEffect, useRef } from "react";
import "./input_grid.css"
import { supabase } from "../../index.js"

function InputGrid() {
    const textareaRef = useRef(null);

    const [data, setData] = useState([]);
    const [arrayCantidad, setArrayCantidad] = useState([]);

    // Add a new state variable for the selected prefix
    const [selectedPrefix, setSelectedPrefix] = useState("");

    useEffect(() => {
        fetchData();
        adjustTextareaHeight();
        window.addEventListener('resize', adjustTextareaHeight);

        return () => {
            window.removeEventListener('resize', adjustTextareaHeight);
        };
    }, []);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {    
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    async function fetchData() {
        const { data, error } = await supabase
            .from('subpartidas')
            .select('*')
        
        if (error) {
            console.error(error)
        } else {
            setData(data);
            console.log(data)
            setArrayCantidad(Array(data.length).fill(0));
            console.log(arrayCantidad);
        }
    }

    async function pushData(index) {
      const { data, error } = await supabase
      .from('subpartidas')
      .update({cantidad_al_dia: arrayCantidad[index]})
      .eq('id', index + 1)
    }

    const handleClick = () => {
      for(let i = 0; i < arrayCantidad.length; i++)
      {
        pushData(i);
      }
    }

    // function handleInputChange(event, itemId) {
    //     const { name, value } = event.target;
    //     setData(prevData => {
    //         const newData = prevData.map(item => {
    //             if (item.id === itemId) {
    //                 return { ...item, [name]: value };
    //             }
    //             return item;
    //         });
    //         return newData;
    //     });
    //     // Update the corresponding row in the database
    //     supabase
    //         .from('subpartidas')
    //         .update({ [name]: value })
    //         .eq('id', itemId)
    //         .then((response, error) => {
    //             if (error) {
    //                 console.error(error);
    //             } else {
    //                 console.log(response);
    //             }
    //         });
    // }

    // Sort the data by id
    const sortedData = data.sort((a, b) => a.id - b.id);

    // Filter the rows based on the selected prefix
    const filteredData = sortedData.filter((item) => item.clave.startsWith(selectedPrefix));

    return (
        <div>
            {/* Add a dropdown to select the prefix */}
            <div>
              <select value={selectedPrefix} onChange={(event) => setSelectedPrefix(event.target.value)}>
                  <option value="">All</option>
                  <option value="A.">A</option>
                  <option value="B.">B</option>
                  <option value="C.">C</option>
                  {/* Add more options for other prefixes */}
              </select>
              <button onClick={handleClick}>Submit</button>
            </div>
        
            <div className="header-row">
                <text>Clave</text>
                <text className="header-descripcion">Descripción</text>
                <text>Unidad</text>
                <text className="header-cantidad">Cantidad</text>
                <text>Pendiente</text>
            </div>
          
      
            <div style={{ height: '900px', margin: '10px', overflowY: 'scroll' }}>

              {/* Render the rows based on the filtered data */}
              {filteredData.map((item, index) => (
                <div key={item.id} className="row">
                  <text
                    className="num-sub"
                    type="text"
                    name="field1"
                    readOnly
                    placeholder={item.clave}
                  >
                    {item.clave}
                  </text>
                  <text
                    ref={textareaRef}
                    className="descripcion"
                    name="field2"
                    readOnly
                    placeholder={item.descripcion}
                    rows="1" // Set initial row count to 1
                  >
                    {item.descripcion}
                  </text>
                  <text
                    type="text"
                    name="field3"
                    readOnly
                    placeholder={item.unidad}
                  >
                    {item.unidad}
                  </text>
                  <input 
                    type="text" 
                    name="field4" 
                    placeholder= {0}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const numericValue = inputValue.replace(/[^0-9.]/g, ''); // Filter out non-numeric characters
                      
                      setArrayCantidad((prevArray) => {
                        const newArray = [...prevArray];
                        const floatValue = parseFloat(numericValue);
                        const isValidFloat = !isNaN(floatValue);
                        newArray[index] = isValidFloat ? floatValue : 0;
                        if (newArray[index] > (item.cantidad_total - item.cantidad_al_dia))
                        {
                          // Display proper error message
                          console.log("La cantidad actual no puede exceder la cantidad pendiente.")
                          newArray[index] = 0;
                        }
                        return newArray;
                      });

                      event.target.value = numericValue; // Update the input value to reflect the filtered numeric value
                    }}                  
                    
                  />
                  <text
                    type="text"
                    name="field5"
                    readOnly
                    placeholder={(item.cantidad_total - item.cantidad_al_dia).toFixed(2)}
                  >
                    {(item.cantidad_total - item.cantidad_al_dia).toFixed(2)}
                  </text>
                </div>
              ))}
            </div>
          </div>
        // </div>
      );      
}

export default InputGrid;
