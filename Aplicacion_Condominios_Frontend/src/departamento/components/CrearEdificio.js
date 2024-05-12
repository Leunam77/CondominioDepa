import React, { Component } from "react";
import axios from "axios";
import { input, Button, Form, FormGroup, Label, Input } from "reactstrap";

const endpoint = "http://localhost:8000/api";
class CrearEdificio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre_edificio: "",
            descripcion_edificio: "",
            imagen_edificio: "",
            cantidad_pisos: 0,
            bloques: [],
            bloque_seleccionado: "",
            modal_open: false,
            errors: {},

        }
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${endpoint}/bloques`);
            this.setState({ bloques: response.data });
        } catch (error) {
            console.error(error);
        }
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSelect = (event) => {
        this.setState({ bloque_seleccionado: event.target.value });
    }
    toggleModal = () => {
        this.setState({ modal_open: !this.state.modal_open });
    }
    handleConfirm = (e) => {

    }
    validacion = () => {
        let nombre_edificio = this.state.nombre_edificio;
        let descripcion_edificio = this.state.descripcion_edificio;
        let imagen_edificio = this.state.imagen_edificio;
        let cantidad_pisos = this.state.cantidad_pisos;
        let bloque_seleccionado = this.state.bloque_seleccionado;
        let validationErrors = {};
        let isValid = true;
        if (!nombre_edificio.trim()) {
            isValid = false;
            validationErrors.nombre_edificio = "Por favor ingrese el nombre del edificio.";
        }
        if (!descripcion_edificio.trim()) {
            isValid = false;
            validationErrors.descripcion_edificio = "Por favor ingrese la descripcion del edificio.";
        }
        if (!imagen_edificio) {
            isValid = false;
/*             errors["imagen_edificio"] = "Por favor ingrese la imagen del edificio.";
 */        }
        if (!cantidad_pisos) {
            isValid = false;
            validationErrors.cantidad_pisos = "Por favor ingrese la cantidad de pisos del edificio.";
        }
        if (!bloque_seleccionado.trim()) {
            isValid = false;
            validationErrors.bloque_seleccionado = "Por favor seleccione el bloque al que pertenece el edificio.";
        }
        this.setState({ errors: validationErrors });
        return isValid;
    }
}
export default CrearEdificio;