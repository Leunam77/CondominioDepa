import React, {Component, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
        errors: {}
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
    const pisosOptions = [];
    for (let i = 1; i <= numeroPisos; i++) {
        pisosOptions.push(<option key={i} value={i}>{i}</option>);
    }
    return(
            <>
                <h1>Editar Departamento</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        id="inputRegistro"
                        type="text"
                        name="nombre_departamento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                    />
                    {/* {this.state.errors.nombre_departamento && (
                        <span>
                        {this.state.errors.nombre_departamento}
                        </span>
                    )} */}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="numero_habitaciones"
                        placeholder="4"
                        onChange={handleInput}
                        />
                    {/* {this.state.errors.numero_habitaciones && (
                        <span>
                        {this.state.errors.numero_habitaciones}
                        </span>
                    )} */}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="numero_personas"
                        placeholder="4"
                        onChange={handleInput}
                        />
                    {/* {this.state.errors.numero_personas && (
                        <span>
                        {errors.numero_personas}
                        </span>
                    )} */}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="superficie"
                        placeholder="4"
                        onChange={handleInput}
                        />
                    {/* {this.state.errors.superficie && (
                        <span>
                        {this.state.errors.superficie}
                        </span>
                    )} */}

                    <input
                        type="checkbox"
                        id="checkBoxdisponibilidad"
                        onChange={changeChecked}
                    />
                    <span>Disponible</span>
                    <input
                        type="checkbox"
                        id="checkBoxAmoblado"
                        onChange={changeChecked}
                    />
                    <span>Amoblado</span>

                    <input
                        id="inputRegistro"
                        type="text"
                        name="descripcion_departamento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                    />
                    {/* {this.state.errors.descripcion_departamento && (
                        <span>
                        {this.state.errors.descripcion_departamento}
                        </span>
                    )} */}

                    <select id="desplegable" onChange={this.myFunction}>
                        <option disabled selected>
                            {" "}
                            Seleccione un piso
                        </option>
                        {/* {this.pisosAr.map((piso, id) => {
                            return <option>{piso.nombre_piso}</option>;
                        })} */}
                        {(() => {
                            const options = [];
                            for (let i = 1; i <= numeroPisos; i++) {
                                options.push(<option key={i}>{i}</option>);
                            }
                            return options;
                        })()}
                    </select>
                    <input
                    type="hidden"
                    name="piso_id"
                    id="piso_id"
                    onChange={handleInput}
                    />

                    <button type="submit">
                    {" "}
                    Continuar
                    </button>
                </form>
            </>
        );
    
}
export default EditarDep