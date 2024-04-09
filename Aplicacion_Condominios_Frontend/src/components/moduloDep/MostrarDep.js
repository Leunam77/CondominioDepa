import React, {useEffect, useState} from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const endpoint = 'http://localhost:8000/api'
const MostrarDep = () => {
    const [departamentos, setDepartamentos] = useState ([])
    useEffect ( ()=> {
        getAllDepartments()
    }, [])

    const getAllDepartments = async () => {
        const response = await axios.get(`${endpoint}/departamentos`)
        setDepartamentos(response.data)
    }
    const deleteDepartment = async (id) => {
        axios.delete(`${endpoint}/departamento/${id}`)
        getAllDepartments()
    }
    return(
        <div>
            <div className="d-grip gap-2">
                <Link to="/create" className="btn btn-success btn-lg mt-2 mb-2 text-white">Create</Link>
            </div>
            <table className="table table-striped">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>Nombre</th>
                        <th>Numero de habitaciones</th>
                        <th>Numero de personas</th>
                        <th>Superficie</th>
                        <th>Disponibilidad</th>
                        <th>Amoblado</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map((departamento) => (
                        <tr key = {departamento.id}> 
                            <td> {departamento.nombre_departamento} </td>
                            <td> {departamento.numero_habitaciones} </td>
                            <td> {departamento.numero_personas} </td>
                            <td> {departamento.superficie} </td>
                            <td> {departamento.disponibilidad} </td>
                            <td> {departamento.amoblado} </td>
                            <td> {departamento.descripcion_departamento} </td>
                            <td>
                                <Link to={`/edit/${departamento.id}`} className="btn btn-warning">Edit</Link>
                                <button onClick={()=>deleteDepartment(departamento.id)} className="btn btn-da">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MostrarDep