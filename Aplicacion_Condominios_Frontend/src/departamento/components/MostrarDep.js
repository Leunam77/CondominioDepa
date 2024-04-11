import React, { useEffect, useState } from "react";
import axios from "axios";
import './DepartamentosCss.css';

import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
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


    return(
        <div className="Deps">
            <h1 className="title">Departamentos</h1>
            <div className="d-grip gap-2">
            <Link to="/CrearDepartamento" className="btn btn-success btn-lg mt-2 mb-2 text-white -creat"style={{ backgroundColor: 'rgba(242, 108, 79, 1)', border: 'none'}}>Create</Link>
            </div>
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
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Disponibilidad: {departamento.disponibilidad}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Amoblado: {departamento.amoblado}</CardSubtitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Descripcion: {departamento.descripcion_departamento}</CardSubtitle>
                            <div className="botones">
                                <Button className="botoncard"><FontAwesomeIcon icon={faArrowRight} className="masInf" /></Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default MostrarDep;
