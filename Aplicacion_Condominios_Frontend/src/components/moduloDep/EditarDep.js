import React, {Component, useState} from "react";
import axios from "axios";
const endpoint = 'http://localhost:8000/api'
class EditarDep extends Component{
    departamentos = [];
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
    getDepartamento = async (id) => {
        const url = `${endpoint}/departamento/${id}`;
        this.setState ({loader: true})
        try{
            const response = await axios.get(url);
            const departamento = response.data.departamento;
            this.setState({ loader: false });
        }catch(error){
            console.error('Error al obtener departamento', error)
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
            </>
        )
    }
}
export default EditarDep