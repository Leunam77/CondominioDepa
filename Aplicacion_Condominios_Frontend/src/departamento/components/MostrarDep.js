import React, { useEffect, useState } from "react";
import axios from "axios";
import './DepartamentosCss.css';

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle , Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarDep = () => {
    const [departamentos, setDepartamentos] = useState ([]);
    const [switchState, setSwitchState] = useState(false);

    useEffect(() => {
        getAllDepartments();
    }, []);

    const getAllDepartments = async () => {
        const response = await axios.get(`${endpoint}/departamentos`);
        setDepartamentos(response.data);
    }

    const deleteDepartment = async (id) => {
        await axios.delete(`${endpoint}/departamento/${id}`);
        getAllDepartments();
    }

    const handleClickEditar = (idDepa) => {
        cookies.set('idDepa', idDepa); // Guarda el ID del departamento en una cookie llamada 'idDepa'
        // Lógica para redirigir a la página de edición
        window.location.href = '/dashboard/editarDepa'; // Redirige a la página de edición
      };
    
      const handleBotonSwitch = () => {
        if (switchState) {
            // Ocupado (redirige al formulario de contrato?)
        } else {
            // Libre
        }
    }
    <input type="checkbox" checked={switchState} onChange={() => { setSwitchState(!switchState); handleBotonSwitch(); }} />

    return(
        <div className="Deps">
            <h1 className="title">Departamentos</h1>
        
            <div className= "lista">
                {departamentos.map((departamento) => (
                    <Card key={departamento.id}>
                        <CardImg
                            alt="Card image cap"
                            src={`${endpointImg}/${departamento.imagen_departamento}`}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{departamento.nombre_departamento}</CardTitle>
                            <div className="botones">
                                <Button className="botoncard" onClick={() => deleteDepartment(departamento.id)}><FontAwesomeIcon icon={faTrashAlt} className="iconos"/></Button>
                                <Button className="botoncard" onClick={() => handleClickEditar(departamento.id)} ><FontAwesomeIcon icon={faPenToSquare} className="iconos"/></Button>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            
                            

                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default MostrarDep;
