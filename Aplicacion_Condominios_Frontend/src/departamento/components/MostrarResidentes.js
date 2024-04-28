import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, Row, Col, Container, Label, CardText } from 'reactstrap';


const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';

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

    return (
        <>
            <Container>
                <Row >
                    <Label className="text-center mb-4 titulosForms">Residentes</Label>
                    {residentes.map((residente) => {
                        const contrato = contratos[residente.contrato_id];
                        const departamento = departamentos[contrato.departamento_id];
                        const edificio = edificios[departamento.edificio_id];
                        const bloque = bloques[edificio.bloque_id];

                        return (
                            <Col sm={2} key={residente.id}>
                                <Card >
                                    <CardImg
                                        className="cardImgResidente"
                                        alt="Card image cap"
                                        src={`${endpointImg}/${residente.imagen_residente}`}
                                        top
                                    />
                                    <CardBody>
                                        <CardText>
                                            <Label>{residente.nombre_residente} {residente.apellidos_residente}</Label>
                                            <Label> DNI: {residente.cedula_residente}</Label>
                                            <Label> Bloque: {bloque?.nombre_bloque || 'Ninguno'}</Label>
                                            <Label> Edificio: {edificio?.nombre_edificio || 'Ninguno'}</Label>
                                            <Label> Departamento: {departamento?.nombre_departamento || 'Ninguno'}</Label>
                                            <Label> Celular: {residente.telefono_residente}</Label>
                                            <Label> Tipo de residente: {residente.tipo_residente}</Label>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    )
}

export default MostrarResidentes;
