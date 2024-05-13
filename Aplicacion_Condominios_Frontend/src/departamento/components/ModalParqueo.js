import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Row, Col } from 'reactstrap';
import "./customs.css";
import "./PopUpCss.css";

const ModalParqueo = (props) => {
	const { isOpen, toggle, confirm, message } = props;
    const [nombre, setNombre] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setNombre('');
            setDepartamento('');
            setErrors({});
        }
    }, [isOpen]);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        setErrors({ ...errors, nombre: '' });
    };

    const handleDepartamentoChange = (e) => {
        setDepartamento(e.target.value);
        setErrors({ ...errors, departamento: '' });
    };

    const handleSubmit = () => {
        const validationErrors = {};
    
        if (!nombre.trim()) {
            validationErrors.nombre = "Este campo es obligatorio";
        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre)) {
            validationErrors.nombre = "Ingrese un nombre válido";
        }
    
        if (!departamento) {
            validationErrors.departamento = "Debe seleccionar un departamento";
        }
    
        if (Object.keys(validationErrors).length === 0) {
            confirm(nombre, departamento);
        } else {
            setErrors(validationErrors);
        }
    };

    const opcionesDepartamentos = [
        { id: 1, nombre: 'Departamento 1' },
        { id: 2, nombre: 'Departamento 2' },
        { id: 3, nombre: 'Departamento 3' },
        { id: 11, nombre: 'Departamento 1' },
        { id: 12, nombre: 'Departamento 2' },
        { id: 13, nombre: 'Departamento 3' },
    ];
    
	return (
		<Modal className="modalContainer" isOpen={isOpen} toggle={toggle} >
			<ModalHeader toggle={toggle}></ModalHeader>
			<ModalBody id="modalBodyParqueo">
                <Form>
                <Row>
                    <Col md={5}>
                    <FormGroup>
                        <Label className="label-custom">Nombre de parqueo</Label>
                        <Input 
                            id="nombre" 
                            className="customInput"
                            name="nombre"
                            type="text" 
                            value={nombre} 
                            onChange={handleNombreChange} 
                        />
                        {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                    </FormGroup>
                    </Col>
                    <Col md={7}>
                    <FormGroup>
                        <Label className="label-custom">Asignar un departamento</Label>
                        <Input 
                            type="select"
                            className="customInput opcionSelect"
                            name="departamento_id"
                            id="departamento_id"
                            value={departamento}
                            onChange={handleDepartamentoChange}
                            size={1} 
                            onClick={(e) => e.target.size = Math.min(7, opcionesDepartamentos.length)} 
                            onBlur={(e) => e.target.size = 1}
                        >
                            <option value="" disabled defaultValue>Seleccionar departamento</option>
                            {opcionesDepartamentos.map(departamento => (
                                <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                            ))}
                        </Input>
                        {errors.departamento && <div className="text-danger">{errors.departamento}</div>}
                    </FormGroup>
                    </Col>
                </Row>
                </Form>
			</ModalBody>
			<ModalFooter className="button-PD">
                <Button color="primary" className="confirmBoton" onClick={handleSubmit}>Guardar</Button>
            </ModalFooter>
		</Modal>
	);
}

export default ModalParqueo;