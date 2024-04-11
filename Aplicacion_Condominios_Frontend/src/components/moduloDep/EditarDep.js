import React, {Component, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Input, FormGroup, Label, Col, Row, Button
} from "reactstrap";
const endpoint = 'http://localhost:8000/api'
function EditarDep (){
    //obtener un departamento por su id
    const [departamento, setDepartamento] = useState(null);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        nombre_departamento: '',
        numero_habitaciones: 0,
        numero_personas: 0,
        numero_pisos: 0,
        superficie: 0,
        disponibilidad: false,
        amoblado: false,
        descripcion_departamento: '',
        piso_id: '',
        errors: {},
        bloques: [],
        bloqueSeleccionado: '',
        edificioSeleccionado: '',
        edificios: [],
        numeroPisos: 0,
        pisoSeleccionado: '',
        imagenDep: ""
    });

    const getBloques = async () => {
        const url = `${endpoint}/bloques`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const bloques = response.data.bloques;
            this.setState({ loader: false });
        }catch(error){
            console.error('Error al obtener bloques', error)
            this.setState({ loader: false });
        }
    };
    const getEdificios = async () => {
        const url = `${endpoint}/edificios`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const edificios = response.data.edificios;
            this.setState({ loader: false });
        }catch(error){
            console.error('Error al obtener edificios', error)
            this.setState({ loader: false });
        }
    };
    const getDepartamento = async (id) => {
        const url = `${endpoint}/departamento/${id}`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const departamento = response.data.departamento;
            setDepartamento(departamento);
            document.getElementById('nombre_departamento').value = departamento.nombre_departamento;
            document.getElementById('numero_habitaciones').value = departamento.numero_habitaciones;
            document.getElementById('numero_personas').value = departamento.numero_personas;
            document.getElementById('superficie').value = departamento.superficie;
            document.getElementById('disponibilidad').value = departamento.disponibilidad;
            document.getElementById('bloque_id').value = departamento.bloque_id;

            this.setState({ loader: false });
        }catch(error){
            console.error('Error al obtener departamento', error)
            this.setState({ loader: false });
        }
    };
    //definir el estado del departamento con los datos que reciba de getDepartamento

    const numeroPisos = formValues.numero_pisos;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para enviar los datos del formulario
        const form = e.target;
        //setFormValues(form);
        if(formValido(form)){
            const url = `${endpoint}/departamento`;
            const data = new FormData();

            data.append("nombre_departamento", form.state.nombre_departamento);
            data.append("numero_habitaciones", form.state.numero_habitaciones);
            data.append("numero_personas", form.state.numero_personas);
            data.append("superficie", form.state.superficie);
            data.append("disponibilidad", form.state.disponibilidad ? '1' : '0');
            data.append("amoblado", form.state.amoblado ? '1' : '0');
            data.append("descripcion_departamento",form.state.descripcion_departamento);
            data.append("piso", form.state.pisoSeleccionado);
            if (form.state.imagenDep) {
                data.append("imagen_departamento", form.state.imagenDep);
            }
            data.append("edificio_id", form.state.edificioSeleccionado)

            
            axios.post(url, data).then((res) => {
                console.log(res);
                window.location.href = "./depas";
              });
            
        }else{
            console.log('Formulario inválido, revisar errores');
        }
    };
    function formValido(form){
         let valido = true;
        let validationErrors = {};
        //const { nombre_departamento, numero_habitaciones, numero_personas, descripcion_departamento, pisoSeleccionado, bloqueSeleccionado, edificioSeleccionado, imagenDep } = formValues;
        if (!formValues.nombre_departamento.trim()) {
            validationErrors.nombre_departamento = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(
                formValues.state.nombre_departamento
            )
        ) {
            validationErrors.nombre_departamento = "Ingrese un nombre válido";
        }

        if (!formValues.state.numero_habitaciones.trim()) {
            validationErrors.numero_habitaciones = "Este campo es obligatorio";
        } else {
            if (!/^(?!-)(?:[2-9]|[1]\d)$/.test(formValues.state.numero_habitaciones)) {
                validationErrors.numero_habitaciones =
                    "Ingrese un número de habitaciones válido";
            }
        }

        if (!formValues.state.numero_personas.trim()) {
            validationErrors.numero_personas = "Este campo es obligatorio";
        } else {
            if (!/^(?!-)(?:[2-9]|[1]\d)$/.test(formValues.state.numero_personas)) {
                validationErrors.numero_personas =
                    "Ingrese un número de personas válido";
            }
        }

        if (!formValues.state.descripcion_departamento.trim()) {
            validationErrors.descripcion_departamento = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú0-9,"":;.() ]{1,120}$/.test(
                formValues.state.descripcion_departamento
            )
        ) {
            validationErrors.descripcion_departamento =
                "Ingrese una descripcion válida";
        }

        if (!formValues.state.pisoSeleccionado) {
            validationErrors.pisoSeleccionado = "Debe seleccionar un piso";
        }

        if (!formValues.state.bloqueSeleccionado) {
            validationErrors.bloqueSeleccionado = "Debe seleccionar un bloque";
        }

        if (!formValues.state.edificioSeleccionado) {
            validationErrors.edificioSeleccionado = "Debe seleccionar un edificio";
        }

        if (formValues.state.imagenDep.name) {
            const extensiones = ["png", "PNG", "jpg", "jpeg"];
      
            var nombreArchivo = formValues.state.imagenDep.name;
            const extension = nombreArchivo.substring(
              nombreArchivo.lastIndexOf(".") + 1,
              nombreArchivo.length
            );
            if (!extensiones.includes(extension)) {
              document.getElementsByClassName("imagen_input").value = "";
      
              formValues.setState({ imagenDep: "" });
              validationErrors.imagenDep =
                "La imagen tiene que tener una extension .png, .jpg, .PNG o .jpeg";
            }
        }

        setErrors({ errors: validationErrors });
        if (Object.keys(errors).length === 0) {
            // Realizar alguna acción si no hay errores de validación
            console.log('Formulario válido, enviar datos');
        }else{
            valido = false;
        }
        return valido;
    }
    const handleInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

    const changeChecked = (e) => {
        this.setState({
          [e.target.name]: e.target.checked,
        });
      };

    const handleBloqueSeleccionado = (event) => {
        const idBloque = event.target.value;
        setState({ bloqueSeleccionado: idBloque });

        this.cargarOpcionesDependientes(idBloque);
    };

    const pisosOptions = [];
    for (let i = 1; i <= numeroPisos; i++) {
        pisosOptions.push(<option key={i} value={i}>{i}</option>);
    }
    return (
        <>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'rgb(233,242,249)' }}>
                    <div className="custom-form">
                        <FormGroup col>
                            <Row>
                                <Col sm={12}>
                                    <h2 className="text-center mb-5">Crear departamento</h2>
                                    <form onSubmit={handleSubmit}>
                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Nombre departamento
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                type="text"
                                                name="nombre_departamento"
                                                placeholder="Ingrese nombre"
                                                onChange={handleInput}
                                            />
                                            {errors.nombre_departamento && (
                                                <span>{errors.nombre_departamento}</span>
                                            )}
                                        </FormGroup >
                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Número de habitaciones
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                type="number"
                                                name="numero_habitaciones"
                                                placeholder="4"
                                                onChange={handleInput}
                                            />
                                            {errors.numero_habitaciones && (
                                                <span>{errors.numero_habitaciones}</span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Número de personas
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                type="number"
                                                name="numero_personas"
                                                placeholder="4"
                                                onChange={handleInput}
                                            />
                                            {errors.numero_personas && (
                                                <span>{errors.numero_personas}</span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Superficie
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                type="number"
                                                name="superficie"
                                                placeholder="4"
                                                onChange={handleInput}
                                            />
                                            {errors.superficie && (
                                                <span>{errors.superficie}</span>
                                            )}
                                        </FormGroup>
                                        <Row className="mb-4">
                                            <Col sm={6}>

                                                <Label
                                                    check
                                                    className="label-custom"
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        id="checkBoxdisponibilidad"
                                                        onChange={() => this.changeChecked('disponibilidad')}
                                                    />
                                                    {' '}
                                                    Disponible
                                                </Label>
                                            </Col>
                                            <Col sm={6}>

                                                <Label
                                                    check
                                                    className="label-custom"
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        id="checkBoxAmoblado"
                                                        onChange={() => changeChecked('amoblado')}
                                                    />
                                                    {' '}
                                                    Amoblado
                                                </Label>


                                            </Col>
                                        </Row>

                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Selecciona un bloque
                                            </Label>
                                            <Input
                                                type="select"
                                                name="bloque_id"
                                                id="bloque_id"
                                                onChange={handleBloqueSeleccionado}
                                            >
                                                <option value="">Seleccionar Bloque</option>
                                                {this.state.bloques.map(bloque => (
                                                    <option key={bloque.id} value={bloque.id}>{bloque.nombre_bloque}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>

                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Selecciona un edificio
                                            </Label>
                                            <Input
                                                type="select"
                                                className="mb-3 w-100"
                                                name="edificio_id"
                                                id="edificio_id"
                                                onChange={this.handleEdificioSeleccionado}
                                            >
                                                <option value="">Seleccionar Edificio</option>
                                                {this.state.edificios.map(edificio => (
                                                    <option key={edificio.id} value={edificio.id}>{edificio.nombre_edificio}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Label
                                                className="label-custom"
                                            >
                                                Selecciona un piso
                                            </Label>
                                            <Input
                                                type="select"
                                                name="piso"
                                                id="piso"
                                                value={pisoSeleccionado}
                                                onChange={(e) => this.setState({ pisoSeleccionado: e.target.value })}
                                            >
                                                <option value="">Seleccionar piso</option>
                                                {pisosOptions}
                                            </Input>
                                        </FormGroup>
                                        <Label
                                            size="sm"
                                            style={{ fontWeight: 'bold' }}

                                        >
                                            Subir una imagen
                                        </Label>
                                        <Input
                                            type="file"
                                            className="mb-3 w-100"
                                            name="imagen_departamento"
                                            id="imagen_departamento"
                                            onChange={this.handleChange}
                                        >
                                        </Input>
                                        <FormGroup className="mb-5">
                                            <Label
                                                className="label-custom"
                                            >
                                                Descripción
                                            </Label>
                                            <Input
                                                id="inputRegistro"
                                                type="textarea"
                                                name="descripcion_departamento"
                                                placeholder="Ingrese descripcion"
                                                onChange={this.handleInput}
                                            />
                                        </FormGroup>
                                        <Button size="lg" type="submit" className="custom-button mx-auto d-block"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Continuar
                                        </Button>
                                    </form>
                                </Col>
                            </Row>
                        </FormGroup>
                    </div>

                </div>


            </>
    );
    
}
export default EditarDep