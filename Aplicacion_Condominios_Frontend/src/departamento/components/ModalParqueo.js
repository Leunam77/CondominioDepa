import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap';
import axios from 'axios';
import "./customs.css";

const endpoint = "http://localhost:8000/api";

const ModalParqueo = (props) => {
    const { isOpen, onSubmit, toggle, idParqueo, parqueos, departamentos } = props;
    const [edificios, setEdificios] = useState([]);
    const [bloques, setBloques] = useState([]);
    const [nombre, setNombre] = useState('');
    const [departamentoSelec, setDepartamentoSelec] = useState('');
    const [edificioSelec, setEdificioSelec] = useState('');
    const [pisoSelec, setPisoSelec] = useState('');
    const [bloqueSelec, setBloqueSelec] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setNombre('');
            setDepartamentoSelec("");
            setErrors({});
        } else {
            if (idParqueo) {
                const parqueo = parqueos.find(parqueo => parqueo.id === idParqueo);
                const departamento = departamentos.find(departamento => departamento.id === parqueo.departamento_id);
                try {
                    const edificios = async () => {
                        const response = await axios.get(`${endpoint}/edificios-short`);
                        const data = await response.json();
                        console.log(data);
                        const edificio = data.find(edificio => departamento.edificio_id === edificio.id);
                        setEdificios(data);
                        setEdificioSelec(edificio);
                    }
                } catch (error) {
                    console.log(error);
                }
                
                try {
                    const bloques = async () => {
                        const response = await axios.get(`${endpoint}/bloques-short`);
                        const data = await response.json();
                        const bloque = data.find(bloque => departamento.bloque_id === bloque.id);
                        setBloques(data);
                        setBloqueSelec(bloque);
                    }
                } catch (error){}
                setNombre(parqueo.nombre_parqueo);
                setDepartamentoSelec(departamento.id);
                
            }
        }
    }, [isOpen, departamentos, idParqueo, parqueos]);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        setErrors({ ...errors, nombre: '' });
    };

    const handleDepartamentoChange = (e) => {
        setDepartamentoSelec(e.target.value);
        setErrors({ ...errors, departamentoSelec: '' });
    };

    const handleSubmit = () => {
        const validationErrors = {};

        if (!nombre.trim()) {
            validationErrors.nombre = "Este campo es obligatorio";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre)) {
            validationErrors.nombre = "Ingrese un nombre válido";
        }

        if (!departamentoSelec) {
            validationErrors.departamento = "Debe seleccionar un departamento";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ id: idParqueo,nombre_parqueo: nombre, departamento_id: departamentoSelec });
        }
    };


    return (
        <Modal className="modalContainer" isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} className="modalTitle">Editar</ModalHeader>
            <ModalBody id="modalBodyParqueo">
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label-custom">Nombre</Label>
                                <Input
                                    id="nombre"
                                    className="customInput"
                                    name="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    invalid={errors.nombre ? true : false}
                                />
                                <FormFeedback>{errors.nombre}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label-custom">Bloque</Label>
                                <Input
                                    type="select"
                                    className="customInput"
                                    name="Bloque_id"
                                    id="Bloque_id"
                                    value={bloqueSelec}
                                    
                                >
                                    <option value={bloqueSelec.id}>{bloqueSelec.nombre_bloque}</option>
                                    {bloques.map(bloque => (<option key={bloque.id} value={bloque.id}>{bloque.nombre_bloque}</option>))}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label-custom">Edificio</Label>
                                <Input
                                    type="select"
                                    className="customInput"
                                    name="edificio_id"
                                    id="edificio_id"
                                    value={edificioSelec}
                                    
                                >
                                    <option value={edificioSelec.id}>{edificioSelec.nombre_edificio}</option>
                                    {edificios.map(edificio => (<option key={edificio.id} value={edificio.id}>{edificio.nombre_edificio}</option>))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                                <FormGroup>
                                    <Label className="label-custom">Departamento</Label>
                                    <Input
                                        type="select"
                                        className="customInput"
                                        name="departamento_id"
                                        id="departamento_id"
                                        onChange={handleDepartamentoChange} 
                                        value={departamentoSelec}
                                        invalid={errors.departamentoSelec ? true : false}
                                        
                                    >
                                        <option disabled value=''>{" "}Seleccionar departamento</option>
                                        {departamentos.map(departamento => (
                                            <option key={departamento.id} value={departamento.id} >{departamento.nombre_departamento}</option>
                                        ))}
                                    </Input>
                                    <FormFeedback>{errors.departamentoSelec}</FormFeedback>
                                </FormGroup>
                            </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter >
                <Button color='primary' onClick={handleSubmit}>Guardar</Button>
                <Button color="danger" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalParqueo;