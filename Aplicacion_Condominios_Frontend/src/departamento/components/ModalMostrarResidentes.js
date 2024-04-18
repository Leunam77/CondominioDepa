
import axios from "axios";

import React, { useState, useEffect } from 'react';
const endpoint = "http://localhost:8000/api";
const estadoRes = 0;
const ModalUsuarios = ({agregarResidente, estado1, toggleModal }) => {
  // Aquí puedes usar useState para manejar el estado local de la ventana modal
  
  const [residentes, setResidentes] = useState([]);
  // Si necesitas hacer una solicitud para obtener la lista de usuarios, puedes usar useEffect
  useEffect(() => {
    
    axios.get(`${endpoint}/residentes-disp/${estadoRes}`)
    .then((response) => {
      setResidentes(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener usuarios:', error);
    });
  }, []);



  const salirVentanaModal = () => {
    toggleModal();
}
  return (
    (estado1 &&
        <div className="modal" style={{ display: estado1 ? 'block' : 'none' }}>
      <div className="modal-content">
        <h2>Seleccionar Usuario</h2>
        <ul>
          {residentes.map((residente) => (
            <li key={residente.id}>
              <label onClick={() => { agregarResidente(residente); toggleModal(); }}>
                {residente.nombre_residente} {residente.apellidos_residente}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={salirVentanaModal}>Cerrar</button>
      </div>
    </div>
    )
  );
};

export default ModalUsuarios;