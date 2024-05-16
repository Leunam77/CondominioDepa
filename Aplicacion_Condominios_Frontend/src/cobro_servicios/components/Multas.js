import React, { useState, useEffect } from 'react';

const Multas = ({ idPreaviso }) => {
    const endpoint = "http://localhost:8000/api";
    const [multas, setMultas] = useState([]);

    useEffect(() => {
        fetch(`${endpoint}/obtener-multas?idPreaviso=${idPreaviso}`)
            .then(response => response.json())
            .then(data => {
                const multasArray = data.multas.map(multa => ({
                    id: multa.id,
                    descripcion: multa.descripcion,
                    monto: multa.monto,
                    fecha: multa.fecha
                }));
                setMultas(multasArray);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [idPreaviso]); // Asegúrate de que se vuelva a cargar cuando cambie el idPreaviso

    return (
        <div className="container">
            <h2>Multas del Preaviso ID: {idPreaviso}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción de Servicios</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {multas.map(multa => (
                        <tr key={multa.id}>
                            <td>{multa.id}</td>
                            <td>{multa.descripcion}</td>
                            <td>{multa.monto}</td>
                            <td>{multa.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Multas;
