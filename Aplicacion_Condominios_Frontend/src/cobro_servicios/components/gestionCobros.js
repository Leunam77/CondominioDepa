import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { FaFileAlt } from 'react-icons/fa'; // Importamos el icono de registrar
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [departamentos, setDepartamentos] = useState([]);
<<<<<<< HEAD
=======
    const [showForm, setShowForm] = useState(false);
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

    useEffect(() => {
        fetch(`${endpoint}/obtener-departamentos`)
            .then(response => response.json())
            .then(data => {
<<<<<<< HEAD
                // Convertimos el objeto en un array de objetos
=======
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
                const departamentosArray = Object.entries(data).map(([id, nombre]) => ({ id, nombre }));
                setDepartamentos(departamentosArray);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
<<<<<<< HEAD
=======

    const generarFormulario = (idDepartamento) => {
        // Aquí puedes implementar la lógica para generar el formulario de pre-aviso
        window.location.href = `/cobros/generar-preaviso/${idDepartamento}`;
    };
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af

    return (
        <div className="container">
            <h2>Gestión de Cobro por Departamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departamento</th>
<<<<<<< HEAD
                        <th>Generar formulario pre-aviso</th>
=======
                        <th>Pre-Aviso</th>
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map(departamento => (
                        <tr key={departamento.id}>
                            <td>{departamento.id}</td>
                            <td>{departamento.nombre}</td>
<<<<<<< HEAD
=======
                            <td>
                                <button className="btn btn-primary" onClick={() => generarFormulario(departamento.id)} style={{ width: '60px' }}>
                                    <FaFileAlt />
                                </button>
                            </td>
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;
