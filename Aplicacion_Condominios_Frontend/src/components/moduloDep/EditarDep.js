import React, {Component, useState} from "react";
import axios from "axios";
const endpoint = 'http://localhost:8000/api'
class EditarDep extends Component{
    /* departamentos = [];
    departamento; */
    /* edificios = [];
    bloques = []; */
    //obtener un departamento por su id
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
    getEdificios = async () => {
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
    getDepartamento = async (id) => {
        const url = `${endpoint}/departamento/${id}`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const departamento = response.data.departamento;
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

    constructor(props) {
        super(props);
        this.state = {
          nombre_departamento: "",
          numero_habitaciones: 0,
          numero_personas: 0,
          superficie: 0,
          disponibilidad: false,
          bloque_id: 0,
          edificio_id: 0,
          piso_id: 0,
          id: 0,
          loader: false,
        };
    }
    render(){
        return(
            <>
                <h1>Editar Departamento</h1>
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
            </>
        )
    }
}
export default EditarDep