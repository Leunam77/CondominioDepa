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
            bloque_seleccionado: '',
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
        if (this.validacion()) {
            this.storeEdificio(e);
            this.toggleModal();
        } else {
            console.log("Formulario invalido");
        }
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
        }else if( !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_edificio) ){
            isValid = false;
            validationErrors.nombre_edificio = "El nombre del edificio debe contener solo letras y numeros.";
        }
        if (!descripcion_edificio.trim()) {
            isValid = false;
            validationErrors.descripcion_edificio = "Por favor ingrese la descripcion del edificio.";
        }else if( !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(descripcion_edificio) ){
            isValid = false;
            validationErrors.descripcion_edificio = "La descripcion del edificio debe contener solo letras y numeros.";
        }
        
        if (!cantidad_pisos.trim()) {
            isValid = false;
            validationErrors.cantidad_pisos = "Por favor ingrese la cantidad de pisos del edificio.";
        }else if( !/^[0-9]{1,2}$/.test(cantidad_pisos) ){
            isValid = false;
            validationErrors.cantidad_pisos = "La cantidad de pisos debe ser un numero entre 1 y 99.";
        }
        if (!bloque_seleccionado.trim()) {
            isValid = false;
            validationErrors.bloque_seleccionado = "Por favor seleccione el bloque al que pertenece el edificio.";
        }else if( !/^[0-9]{1,2}$/.test(bloque_seleccionado) ){
            isValid = false;
            validationErrors.bloque_seleccionado = "El bloque seleccionado debe ser un numero entre 1 y 99.";
        }
        
        if (!imagen_edificio.name) {
            isValid = false;
            const extensiones = ["png", "PNG", "jpg", "jpeg"];
            let nombre_imagen = imagen_edificio.name;
            const extension = nombre_imagen.substring(
                nombre_imagen.lastIndexOf(".") + 1,
                nombre_imagen.length
            );
            if (!extensiones.includes(extension)) {
                document.getElementsByClassName("imagen_input").value = "";

                this.setState({ imagenDep: "" });
                validationErrors.imagenDep =
                    "La imagen debe tener formato PNG, JPG o JPEG";
            } 
        }
        this.setState({ errors: validationErrors });
        return isValid;
    }

    storeEdificio = async (event) => {
        event.preventDefault();
        const data = new FormData();
        
            data.append("nombre_edificio", this.state.nombre_edificio);
            data.append("descripcion_edificio", this.state.descripcion_edificio);
            if(this.state.imagen_edificio){
                data.append("imagen_edificio", this.state.imagen_edificio);
            }
            data.append("cantidad_pisos", this.state.cantidad_pisos);
            data.append("bloque_id", this.state.bloque_seleccionado);
            try {
                const response = await axios.post(`${endpoint}/edificios`, data).then((response) => {
                    window.location.href = "./edificios"; //deberia redirigir a la vista de edificios
                });
                console.log(response);
                this.props.history.push("/edificios");
            } catch (error) {
                console.error(error);
            }
        
    }

}
export default CrearEdificio;