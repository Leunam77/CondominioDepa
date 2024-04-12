import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GestionCobro = () => {
   
    const equipos = [
        { id: 1, nombre: 'Depa 1', descripcion: 'Descripción 1', cantidad: 1000 },
        { id: 2, nombre: 'Depa 2', descripcion: 'Descripción 2', cantidad: 2000 },
        { id: 3, nombre: 'Depa 3', descripcion: 'Descripción 3', cantidad: 1500 },
    ];

    return (
        <div className="container">
            <h2>Gestión de Cobro por Departamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departamento</th>
                        <th>Descripción cobro</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map(equipo => (
                        <tr key={equipo.id}>
                            <td>{equipo.id}</td>
                            <td>{equipo.nombre}</td>
                            <td>{equipo.descripcion}</td>
                            <td>{equipo.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;
