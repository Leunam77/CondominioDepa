import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container, Label, Table, InputGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const endpoint = 'http://localhost:8000/api';
// const endpointImg = 'http://localhost:8000';

const GestionVisitas = () => {
    const [visitas, setVisitas] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        getVisitas();
    }, []);

    const getVisitas = async () => {
        try {
            const response = await axios.get(`${endpoint}/visitas`);
            let visitas = response.data;
            visitas = visitas.filter(visita => visita.activo_visita !== 0);
            visitas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setVisitas(visitas);
        } catch (error) {
            console.error("Error al obtener las visitas:", error);
        }
    }

    const deleteVisita = async (id) => {
        await axios.delete(`${endpoint}/visita/${id}`);
        getVisitas();
    }

    const desactivarVisita = async (id) => {
        await axios.put(`${endpoint}/visitaDes/${id}/desactivar`, {
            activo_visita: false,
            
        });
        getVisitas();
    }

    const registrarVisita = () => {
        window.location.href = '/dashboard/registrarVisita';
    };
    const manejarBusqueda = async (e) => {
        setBusqueda(e.target.value);
    }

    return (

        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Label className="text-center mb-5 titulosForms">Gestión de visitas</Label>
                        </Row>
                        <Row >
                            <Col sm={7}>
                                <InputGroup >
                                    <Input placeholder="Buscar visitante..." onChange={manejarBusqueda} 
                                        style={{
                                            borderRadius: "15px",
                                            border: "1px solid rgba(0, 0, 0, 0.3)",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                            <Col className="d-flex justify-content-end" sm={5}>
                                <Button type="button" className="custom-button" onClick={registrarVisita}>Marcar Ingreso</Button>
                            </Col>
                        </Row>
                        <Table striped responsive bordered className="mt-5">
                            <thead className="text-center" >
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Cédula</th>
                                    <th>Celular</th>
                                    <th>Ingreso</th>
                                    <th>Salida</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="visitasTabla">
                                {visitas.filter(visita => {
                                    if (busqueda === "") {
                                        return visita;
                                    } else if (visita.nombre_visita.toLowerCase().includes(busqueda.toLowerCase()) || visita.apellidos_visita.toLowerCase().includes(busqueda.toLowerCase()) || visita.cedula_visita.toLowerCase().includes(busqueda.toLowerCase())) {
                                        return visita;
                                    }
                                    return false;
                                }).map((visita) => (
                                    (visita.activo_visita && visita.activo_visita !== 0) &&
                                    <tr key={visita.id}>
                                        <td className="celdaVisita">{visita.nombre_visita}</td>
                                            <td className="celdaVisita">{visita.apellidos_visita}</td>
                                            <td className="celdaVisita">{visita.cedula_visita}</td>
                                            <td className="celdaVisita">{visita.telefono_visita}</td>
                                            <td className="celdaVisita">{moment(visita.created_at).format('DD/MM/YYYY HH:mm')}</td>
                                        <td className="text-center celdaVisita">
                                            <Button type="button" className="custom-buttonVisita" onClick={(e) => { e.stopPropagation(); desactivarVisita(visita.id); }}>Marcar Salida</Button>
                                        </td>
                                        <td className="text-center celdaVisita">
                                            <div onClick={(e) => { e.stopPropagation(); deleteVisita(visita.id); }} ><FontAwesomeIcon icon={faTrashAlt} className="iconVisita" /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GestionVisitas;
