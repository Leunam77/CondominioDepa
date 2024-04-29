import React, { useEffect, useState } from "react";
import axios from "axios";
import './DepartamentosCss.css';

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle , Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faPenToSquare , faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarDep = () => {
    const [departamentos, setDepartamentos] = useState ([]);
    const [switchStates, setSwitchStates] = useState({});

    useEffect(() => {
        getAllDepartments();
        cookies.remove('idDepa');
    }, []);

    /* const getAllDepartments = async () => {
        const response = await axios.get(`${endpoint}/departamentos`);
        setDepartamentos(response.data);
        const initialSwitchStates = {};
        response.data.forEach(departamento => {
            initialSwitchStates[departamento.id]  = departamento.disponibilidad;
        });
        setSwitchStates(initialSwitchStates);
    } */

    const getAllDepartments = async () => {
        try {
            const response = await axios.get(`${endpoint}/departamentos`);
            const departamentos = response.data;
            // Guardar la lista de departamentos
            setDepartamentos(departamentos);
            const initialSwitchStates = {};
            // Iterar sobre cada departamento
            for (const departamento of departamentos) {
                // Guardar el estado de disponibilidad de cada departamento
                initialSwitchStates[departamento.id] = departamento.disponibilidad;
    
                // Obtener los contratos asociados a este departamento
                const contratosResponse = await axios.get(`${endpoint}/contratoDep/${departamento.id}`);
                
                //console.log(contratosResponse.data);
                // Guardar los contratos asociados a este departamento
                departamento.contratos = contratosResponse.data.contratos;

                const tieneContratos = departamento.contratos && departamento.contratos.length > 0;
                const tieneVenta = tieneContratos && departamento.contratos.some(contrato => contrato.tipo_contrato === "venta");
                if(tieneVenta){

                    for(const contrato of departamento.contratos){
                        const inquilinoResponse = await axios.get(`${endpoint}/propietario-by-contrato/${contrato.id}`);
                        const tienePropietario = inquilinoResponse.data.residente && inquilinoResponse.data.residente.length > 0;
                        if(tienePropietario){
                            contrato.propietario = inquilinoResponse.data.residente;
                        
                        }else{
                            contrato.propietario = null;
                        }
                    }
                }
                initialSwitchStates[departamento.id] = tieneVenta;
            }
            // Guardar el estado de los interruptores y la lista de departamentos actualizada
            setSwitchStates(initialSwitchStates);
            setDepartamentos(departamentos);
        } catch (error) {
            console.error("Error al obtener departamentos:", error);
        }
    }
    
    const deleteDepartment = async (id) => {
        await axios.delete(`${endpoint}/departamento/${id}`);
        getAllDepartments();
    }

    const handleClickEditar = (idDepa) => {
        cookies.set('idDepa', idDepa);
        window.location.href = '/dashboard/editarDepa'; 
      };

    const handleClickInfo = (idDepa) => {
        cookies.set('idDepa', idDepa);
        window.location.href = '/dashboard/infoDepartamento';
    };
    
    const handleBotonSwitch = (idDepa) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [idDepa]: !prevState[idDepa]
        }));

        if (!switchStates[idDepa]) {
            axios.put(`${endpoint}/departamentos/${idDepa}/actualizarDisp`, {
            disponibilidad: 1,
        });
        } else {
            cookies.set('idDepa', idDepa);
            window.location.href = '/dashboard/crearContrato';
        }
    }

    return(
        <div className="Deps">
            <h1 className="title">Departamentos</h1>
        
            <div className= "lista">
                {departamentos.map((departamento) => (
                    <Card className="cardDepa" key={departamento.id}>
                        <CardImg
                            alt="Card image cap"
                            src={`${endpointImg}/${departamento.imagen_departamento}`}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">{departamento.nombre_departamento}</CardTitle>
                            <p className="card-text">Propietario: {departamento.contrato}</p>
                            <div className="botones">
                                <Button className="botoncard" onClick={() => deleteDepartment(departamento.id)}><FontAwesomeIcon icon={faTrashAlt} className="iconos"/></Button>
                                <Button className="botoncard" onClick={() => handleClickEditar(departamento.id)} ><FontAwesomeIcon icon={faPenToSquare} className="iconos"/></Button>
                                <Button className="botoncard" onClick={() => handleClickInfo(departamento.id)} ><FontAwesomeIcon icon={faArrowCircleRight} className="iconos"/></Button>
                                <label className="switch">
                                    <input type="checkbox" checked={switchStates[departamento.id]} onChange={() => { setSwitchStates(!switchStates); handleBotonSwitch(departamento.id); }} />
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
