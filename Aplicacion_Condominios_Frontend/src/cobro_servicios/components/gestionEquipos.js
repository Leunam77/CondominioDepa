import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GestionEquipos = () => {
   
    const equipos = [
        { id: 1, nombre: 'Equipo 1', descripcion: 'Descripción del Equipo 1', cantidad: 5 },
        { id: 2, nombre: 'Equipo 2', descripcion: 'Descripción del Equipo 2', cantidad: 3 },
        { id: 3, nombre: 'Equipo 3', descripcion: 'Descripción del Equipo 3', cantidad: 7 },
    ];

    return (
        <div className="container">
            <h2>Gestión de Equipos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
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

export default GestionEquipos;
