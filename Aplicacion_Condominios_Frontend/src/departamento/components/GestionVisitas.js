import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const endpoint = 'http://localhost:8000/api';
// const endpointImg = 'http://localhost:8000';

const GestionVisitas = () => {
    const [visitas, setVisitas] = useState ([]);

    useEffect(() => {
        getVisitas();
    }, []);

    const getVisitas = async () => {
        try {
            const response = await axios.get(`${endpoint}/visitas`);
            const visitas = response.data;
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
        await axios.put(`${endpoint}/visitaDes/${id}/desactivar`,{
            activo_visita: false,
        });
        getVisitas();
    }

    const registrarVisita = () => {
        window.location.href = '/dashboard/registrarVisita';
    };

    return(
        
        <>         
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Label className="text-center mb-5 titulosForms">Gestión de visitas</Label>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="button" className="custom-button" onClick={registrarVisita}>Marcar Ingreso</Button>
                            </Col>
                        </Row>
                        <div className="lista">
                            {visitas.map((visita) => (
                                <div key={visita.id}>
                                    {visita.activo_visita &&
                                        <div>
                                            <h3>{visita.nombre_visita}</h3>
                                            <h3>{visita.apellidos_visita}</h3>
                                            <h3>{visita.cedula_visita}</h3>
                                            <h3>{visita.telefono_visita}</h3>
                                            <h3>Ingreso: {moment(visita.created_at).format('DD/MM/YYYY HH:mm')}</h3>
                                            <Button className="botoncard" onClick={(e) => { e.stopPropagation(); desactivarVisita(visita.id); }}>Marcar Salida</Button>
                                            <Button className="botoncard" onClick={(e) => { e.stopPropagation(); deleteVisita(visita.id); }} ><FontAwesomeIcon icon={faTrashAlt} className="iconos" /></Button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default GestionVisitas;
