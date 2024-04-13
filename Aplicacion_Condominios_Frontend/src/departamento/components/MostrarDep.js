import React, { useEffect, useState } from "react";
import axios from "axios";
import './DepartamentosCss.css';

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faX } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarDep = () => {
    const [departamentos, setDepartamentos] = useState ([]);

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

    const mostrarAmoblado = (amoblado) => {
        return amoblado ? "Si" : "No";
    }
    const mostrarDisponibilidad = (disponibilidad) => {
        return disponibilidad ? "Ocupado" : "Libre";
    }

    const handleClickEditar = (idDepa) => {
        cookies.set('idDepa', idDepa); // Guarda el ID del departamento en una cookie llamada 'idDepa'
        // Lógica para redirigir a la página de edición
        window.location.href = '/dashboard/editarDepa'; // Redirige a la página de edición
      };

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
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Numero de habitaciones: {departamento.numero_habitaciones}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Numero de personas: {departamento.numero_personas}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Superficie: {departamento.superficie}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Disponibilidad: {mostrarDisponibilidad(departamento.disponibilidad)}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Amoblado: {mostrarAmoblado(departamento.amoblado)}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Descripcion: {departamento.descripcion_departamento}</CardSubtitle>
                            <div className="botones">
                                <Button className="botoncard" onClick={() => deleteDepartment(departamento.id)}><FontAwesomeIcon icon={faX} className="masInf" /></Button>
                            </div>
                            
                            <div className="botones">
                                <Button className="botoncard" onClick={() => handleClickEditar(departamento.id)} ><FontAwesomeIcon icon={faArrowAltCircleRight} className="masInf" /></Button>
                            </div>

                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default MostrarDep;
