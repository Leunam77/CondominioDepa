import React, {Component, useState} from "react";
import axios from "axios";

const endpoint = 'http://localhost:8000/api'
class CrearDep extends Component{
    departamentos = [];
    pisosAr = [];

    componentDidMount() {
        this.getPisos(3);
    }

    async componentDidMount() {
        try {
         const url = `${endpoint}/bloques`;
          const response = await axios.get(url)
          this.setState({ bloques: response.data });
        } catch (error) {
          console.error('Error al obtener los bloques:', error);
        }
    }

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
        const url = `${endpoint}/edificio/${edificioId}`;
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
          errors:{},
          bloques: []
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
            
      
            axios.post(url, data).then((res) => {
              console.log(res);
              window.location.href = "./departamentos";
            });
          }
    };

    myFunction = async (e) => {
        
    };
    render(){
        const { bloques } = this.state;

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

                    
                    <select>
                        {bloques.map(bloque =>(
                            <option key={bloque.id} value={bloque.id}>
                                {bloque.nombre}
                            </option>
                        ))}
                    </select>
                    

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