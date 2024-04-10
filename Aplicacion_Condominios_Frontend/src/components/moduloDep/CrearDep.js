import React, {Component, useState} from "react";
import axios from "axios";

const endpoint = 'http://localhost:8000/api'
class CrearDep extends Component{
    departamentos = [];
    pisosAr = [];

    componentDidMount() {
        this.getPisos(3);
    }

    getBloques = async () => {
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

    getEdificios = async (bloqueId) => {
        const url = `${endpoint}/edificiosBus?bloque_id=${bloqueId}`;
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

    getPisos = async (edificioId) => {
        const url = `${endpoint}/pisosBus?edificio_id=${edificioId}`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const pisos = response.data.pisos;
            this.pisosAr = Array.from(pisos);
            this.setState({ loader: false });
        }catch(error){
            console.error('Error al obtener pisos', error)
            this.setState({ loader: false });
        }
    };

    constructor(props) {
        super(props);
        this.state = {
          nombre_departamento: "",
          numero_habitaciones: 0,
          numero_personas: 0,
          superficie: 0,
          disponibilidad: false,
          amoblado: false,
          descripcion_departamento: "",
          piso_id: "",
          errors:{},
          contador: 0,
        };
      };

      handleInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

    storeDepartment = async (e) => {
        let piso = document.getElementById("piso_id").value;
        e.preventDefault();
        const validationErrors = {};

        if (!this.state.nombre_departamento.trim()) {
            validationErrors.nombre_departamento = "Este campo es obligatorio";
          } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(this.state.nombre_departamento)) {
            validationErrors.nombre_departamento = "Ingrese un nombre válido";
          }

        if (!this.state.numero_habitaciones.trim()) {
            validationErrors.numero_habitaciones = "Este campo es obligatorio"
        } else {
            if (
                (!/^(?!-)(?:[2-9]|[1]\d)$/.test(this.state.numero_habitaciones))
            ) {
                validationErrors.numero_habitaciones =
                "Ingrese un número de habitaciones válido";
            }
        }

        if (!this.state.numero_personas.trim()) {
            validationErrors.numero_personas = "Este campo es obligatorio"
        } else {
            if (
                (!/^(?!-)(?:[2-9]|[1]\d)$/.test(this.state.numero_personas))
            ) {
                validationErrors.numero_personas =
                "Ingrese un número de personas válido";
            }
        }

        if (!this.state.descripcion_departamento.trim()) {
            validationErrors.descripcion_departamento = "Este campo es obligatorio";
        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(this.state.descripcion_departamento)) {
            validationErrors.descripcion_departamento = "Ingrese una descripcion válida";
          }

          if (!this.state.piso_id) {
            validationErrors.piso_id = "Debe seleccionar un piso";
          }

          this.setState({ errors: validationErrors });

          if (Object.keys(validationErrors).length === 0) {

            const url = `${endpoint}/departamento`;
            const data = new FormData();
      
            data.append("nombre_departamento", this.state.nombre_departamento);
            data.append("numero_habitaciones", this.state.numero_habitaciones);
            data.append("numero_personas", this.state.numero_personas);
            data.append("superficie", this.state.superficie); 
            data.append("disponibilidad", this.state.disponibilidad);
            data.append("amoblado", this.state.amoblado);
            data.append("descripcion_departamento", this.state.descripcion_departamento);
            
      
            data.append("piso_id", piso);
      
            axios.post(url, data).then((res) => {
              console.log(res);
              window.location.href = "./departamentos";
            });
          }
    };

    myFunction = async (e) => {
        let id_piso = [];
        let nombre_piso = [];
        var x = document.getElementById("desplegable");
        var i;

        if (this.state.contador === 0) {
            x.remove(0);
            this.setState({ contador: 1 });
        }

        for (i = 0; i < x.length; i++) {
            nombre_piso.push(x.options[i].value);
            id_piso.push(i + 1);
        }

        var y = document.getElementById("desplegable").value;
        var indice;
        for (indice = 0; indice < x.length; indice++) {
            if (y === nombre_piso[indice]) {
            document.getElementById("piso_id").value =
                id_piso[indice];
            let valor = document.getElementById("piso_id").value;
            this.setState({ piso_id: valor });
            break;
            }
        }
    };
    render(){
        return(
            <>
            <div>
                <form onSubmit={this.storeDepartment}>
                    <input
                        id="inputRegistro"
                        type="text"
                        name="nombre_departamento"
                        placeholder="Ingrese nombre"
                        onChange={this.handleInput}
                    />
                    {this.state.errors.nombre_departamento && (
                        <span>
                        {this.state.errors.nombre_departamento}
                        </span>
                    )}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="numero_habitaciones"
                        placeholder="4"
                        onChange={this.handleInput}
                        />
                    {this.state.errors.numero_habitaciones && (
                        <span>
                        {this.state.errors.numero_habitaciones}
                        </span>
                    )}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="numero_personas"
                        placeholder="4"
                        onChange={this.handleInput}
                        />
                    {this.state.errors.numero_personas && (
                        <span>
                        {this.state.errors.numero_personas}
                        </span>
                    )}

                    <input
                        id="inputRegistro"
                        type="number"
                        name="superficie"
                        placeholder="4"
                        onChange={this.handleInput}
                        />
                    {this.state.errors.superficie && (
                        <span>
                        {this.state.errors.superficie}
                        </span>
                    )}

                    <input
                        type="checkbox"
                        id="checkBoxdisponibilidad"
                        onChange={this.changeChecked}
                    />
                    <span>Disponible</span>
                    <input
                        type="checkbox"
                        id="checkBoxAmoblado"
                        onChange={this.changeChecked}
                    />
                    <span>Amoblado</span>

                    <input
                        id="inputRegistro"
                        type="text"
                        name="descripcion_departamento"
                        placeholder="Ingrese nombre"
                        onChange={this.handleInput}
                    />
                    {this.state.errors.descripcion_departamento && (
                        <span>
                        {this.state.errors.descripcion_departamento}
                        </span>
                    )}

                    <select id="desplegable" onChange={this.myFunction}>
                        <option disabled selected>
                            {" "}
                            Seleccione un piso
                        </option>
                        {this.pisosAr.map((piso, id) => {
                            return <option>{piso.nombre_piso}</option>;
                        })}
                    </select>
                    <input
                    type="hidden"
                    name="piso_id"
                    id="piso_id"
                    onChange={this.handleInput}
                    />

                    <button type="submit">
                    {" "}
                    Continuar
                    </button>
                </form>
            </div>
            </>
        )
    }
}
export default CrearDep