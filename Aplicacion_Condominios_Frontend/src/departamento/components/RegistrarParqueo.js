import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from "reactstrap";
import "./customs.css";

const endpoint = "http://localhost:8000/api";

class RegistrarParqueo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre_parqueo: "",
            departamentos: [],
            departamento_seleccionado: '',
            modal_open: false,
            errors: {},
            validationErrors: {},
        }
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${endpoint}/departamentos`);
            this.setState({ departamentos: response.data }); //luego puedo usar una llamada mas amigable a la API
        } catch (error) {
            console.error(error);
        }
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSelect = (event) => {
        this.setState({ departamento_seleccionado: event.target.value });
    }
    toggleModal = () => {
        this.setState({ modal_open: !this.state.modal_open });
    }
    handleConfirm = (e) => {
        if (this.validacion()) {
            this.storeParqueo(e);
            this.toggleModal();
        } else {
            console.log("Formulario invalido");
        }
    }
    validacion = () => {
        let nombre_parqueo = this.state.nombre_parqueo;
        let departamento_seleccionado = this.state.departamento_seleccionado;
        let validationErrors = {};
        if (!nombre_parqueo.trim()) {
            validationErrors.nombre_parqueo = "Por favor ingrese el nombre del parqueo.";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_parqueo)) {
            validationErrors.nombre_parqueo = "El nombre del parqueo debe contener solo letras y numeros.";
        }
        if (!departamento_seleccionado.trim()) {
            validationErrors.departamento_seleccionado = "Por favor seleccione un departamento.";
        }
        this.setState({ errors: validationErrors });
    }
    storeParqueo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/parqueo`, {
                nombre_parqueo: this.state.nombre_parqueo,
                departamento_id: this.state.departamento_seleccionado
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Label className="text-center mb-4 titulosForms">Registrar Parqueo</Label>
                </Row>
                <Form>
                    <Row >
                        <Col  sm={4}>
                            <FormGroup>
                                <Label className="label-custom" for="nombre_parqueo">Nombre</Label>
                                <Input className="customInput" type="text" name="nombre_parqueo" id="nombre_parqueo" placeholder="Ingrese el nombre del parqueo" onChange={this.handleInput} invalid={this.state.errors.nombre_parqueo ? true : false} />
                                <FormFeedback>{this.state.errors.nombre_parqueo}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col  sm={5}>
                            <FormGroup>
                                <Label className="label-custom" for="departamento_seleccionado">Departamento</Label>
                                <Input className="customInput" type="select" name="departamento_seleccionado" id="departamento_seleccionado" onChange={this.handleSelect} invalid={this.state.errors.departamento_seleccionado}>
                                    <option value="">Seleccione un departamento</option>
                                    {this.state.departamentos.map((departamento) => (
                                        <option key={departamento.id} value={departamento.id}>{departamento.nombre_departamento}</option>
                                    ))}
                                </Input>
                                <FormFeedback>{this.state.errors.departamento_seleccionado}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col style={{marginTop: "22px"}} sm={3}>
                            <Button size="md" type="button" className="custom-button "
                                style={{ fontWeight: 'bold' }}
                                onClick={this.handleConfirm}>
                                Registrar Parqueo
                            </Button>
                        </Col>
                    </Row>  
                </Form>
            </>
        );
    }
}
export default RegistrarParqueo;