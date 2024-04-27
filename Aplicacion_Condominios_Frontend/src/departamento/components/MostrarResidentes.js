import React, { useEffect, useState } from "react";
import axios from "axios";
import './DepartamentosCss.css';

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle , Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarResidentes = () => {
    const [residentes, setResidentes] = useState([]);
    const [contratos, setContratos] = useState({});
    const [departamentos, setDepartamentos] = useState({});
    const [edificios, setEdificios] = useState({});
    const [bloques, setBloques] = useState({});

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        try {
            const responseContratos = await axios.get(`${endpoint}/contratos`);
            const contratosData = responseContratos.data.reduce((acc, contrato) => {
                acc[contrato.id] = contrato;
                return acc;
            }, {});
            setContratos(contratosData);

            const responseDepartamentos = await axios.get(`${endpoint}/departamentos`);
            const departamentosData = responseDepartamentos.data.reduce((acc, departamento) => {
                acc[departamento.id] = departamento;
                return acc;
            }, {});
            setDepartamentos(departamentosData);

            const responseEdificios = await axios.get(`${endpoint}/edificios`);
            const edificiosData = responseEdificios.data.reduce((acc, edificio) => {
                acc[edificio.id] = edificio;
                return acc;
            }, {});
            setEdificios(edificiosData);

            const responseBloques = await axios.get(`${endpoint}/bloques`);
            const bloquesData = responseBloques.data.reduce((acc, bloque) => {
                acc[bloque.id] = bloque;
                return acc;
            }, {});
            setBloques(bloquesData);

            const responseResidentes = await axios.get(`${endpoint}/residentes`);
            setResidentes(responseResidentes.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
      
    return(
        <div className="Deps">
            <h1 className="title">Residentes</h1>
        
            <div className= "lista">
                {residentes.map((residente) => {
                    const contrato = contratos[residente.contrato_id];
                    const departamento = departamentos[contrato.departamento_id];
                    const edificio = edificios[departamento.edificio_id];
                    const bloque = bloques[edificio.bloque_id];

                    return (
                        <Card className="cardDepa" key={residente.id}>
                            <CardImg
                                alt="Card image cap"
                                src={`${endpointImg}/${residente.imagen_residente}`}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">{residente.nombre_residente} {residente.apellidos_residente}</CardTitle>
                                <div className="botones">
                                    <h3> DNI: {residente.cedula_residente}</h3>
                                    <h3> Bloque: {bloque?.nombre_bloque || 'Ninguno'}</h3>
                                    <h3> Edificio: {edificio?.nombre_edificio || 'Ninguno'}</h3>
                                    <h3> Departamento: {departamento?.nombre_departamento || 'Ninguno'}</h3>
                                    <h3> Celular: {residente.telefono_residente}</h3>
                                    <h3> Tipo de residente: {residente.tipo_residente}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

export default MostrarResidentes;
