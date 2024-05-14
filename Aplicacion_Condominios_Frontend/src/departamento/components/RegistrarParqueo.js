import React, { Component } from "react";
import axios from "axios";
import { input, Button, Form, FormGroup, Label, Input } from "reactstrap";

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
        let isValid = true;
        if (!nombre_parqueo.trim()) {
            isValid = false;
            validationErrors.nombre_parqueo = "Por favor ingrese el nombre del parqueo.";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_parqueo)) {
            isValid = false;
            validationErrors.nombre_parqueo = "El nombre del parqueo debe contener solo letras y numeros.";
        }
        if (!departamento_seleccionado.trim()) {
            isValid = false;
            validationErrors.departamento_seleccionado = "Por favor seleccione un departamento.";
        }
        this.setState({ errors: validationErrors });
        return isValid;
    }
    storeParqueo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/parqueos`, {
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
            <div>
                <Form>
                    <FormGroup>
                        <Label for="nombre_parqueo">Nombre del parqueo</Label>
                        <Input type="text" name="nombre_parqueo" id="nombre_parqueo" onChange={this.handleInput} /* invalid={this.state.nombre_parqueo ? true:false} *//>
                        <span style={{ color: "red" }}>{this.state.errors["nombre_parqueo"]}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="departamento_seleccionado">Departamento</Label>
                        <Input type="select" name="departamento_seleccionado" id="departamento_seleccionado" onChange={this.handleSelect}>
                            <option value="">Seleccione un departamento</option>
                            {this.state.departamentos.map((departamento) => (
                                <option key={departamento.id} value={departamento.id}>{departamento.nombre_departamento}</option>
                            ))}
                        </Input>
                        <span style={{ color: "red" }}>{this.state.errors["departamento_seleccionado"]}</span>
                    </FormGroup>
                    <Button onClick={this.handleConfirm}>Registrar Parqueo</Button>
                </Form>
            </div>
        );
    }
}
export default RegistrarParqueo;