import React, { Component} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Input, FormGroup, Label, Col, Row, Button, Container
} from "reactstrap";
import Cookies from 'universal-cookie';
import ModalMostrarResidentes from "./ModalMostrarResidentes";

const endpoint = "http://localhost:8000/api";
const cookies = new Cookies();
class CrearContrato extends Component {

    async componentDidMount() {
        const idDep = cookies.get('idDepa');
        this.setState({ departamento_id: idDep }); 
        console.log(idDep);

        try {
            const response = await axios.post(`${endpoint}/residentes/actualizar-estado-contrato`);
            console.log(response.data);

        } catch (error) {
            console.error('Error al obtener los bloques:', error);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            fecha_inicio_contrato: "",
            fecha_fin_contrato: "",
            precio_contrato: 0,
            tipo_contrato: "",
            vigente_contrato: 1,
            departamento_id: "",
            errors:[],
            residentesSeleccionados:[],
            mostrarModal: false,
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            mostrarModal: !prevState.mostrarModal,
        }));
    };

    agregarResidente = async (residente) => {
        this.setState((prevState) => ({
            residentesSeleccionados: [...prevState.residentesSeleccionados, residente],
          }));
          try{
            const idRes = residente.id;
            const response = await axios.put(`${endpoint}/residentes/${idRes}/actualizarEst`, {
            estado_residente: 1,
          });
          console.log(response.data);
          }catch (error) {
            console.error('Error al actualizar el atributo:', error);
            // Manejar el error según sea necesario
          }
          
    };


    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    eliminarListaResidente = async (idResidente) => {
        try{
            const response = await axios.put(`${endpoint}/residentes/${idResidente}/actualizarEst`, {
            estado_residente: 0,
          });
          console.log(response.data);
          }catch (error) {
            console.error('Error al actualizar el atributo:', error);
            // Manejar el error según sea necesario
          }
          const nuevosResidentes = this.state.residentesSeleccionados.filter(residente => residente.id !== idResidente);

          // Actualiza el estado con el nuevo array de residentes
          this.setState({ residentesSeleccionados: nuevosResidentes });
    }

    storeResident = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!this.state.fecha_inicio_contrato) {
            validationErrors.fecha_inicio_contrato = "Este campo es obligatorio";
          } else {
            let d2 = new Date(this.state.fecha_inicio_contrato);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);
      
            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);
      
            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
              validationErrors.fecha_inicio_contrato = "Esta fecha no es válida";
            }
          }

          if (!this.state.fecha_fin_contrato) {
            validationErrors.fecha_fin_contrato = "Este campo es obligatorio";
          } else {
            let d2 = new Date(this.state.fecha_fin_contrato);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);
      
            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);
      
            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
              validationErrors.fecha_fin_contrato = "Esta fecha no es válida";
            }
          }


        if (!this.state.tipo_contrato) {
            validationErrors.tipo_contrato = "Debe seleccionar tipo de contrato";
        }

        if (this.state.residentesSeleccionados.length === 0) {
            validationErrors.residentesSeleccionados = "Debe seleccionar al menos un residente";
        }
        console.log(validationErrors);

        this.setState({ errors: validationErrors });

        if (Object.keys(validationErrors).length === 0) {
            
            const url = `${endpoint}/contrato`;
            const data = new FormData();

            data.append("fecha_inicio_contrato", this.state.fecha_inicio_contrato);
            data.append("fecha_fin_contrato", this.state.fecha_fin_contrato);
            data.append("precio_contrato", this.state.precio_contrato);
            data.append("tipo_contrato", this.state.tipo_contrato);
            data.append("vigente_contrato", this.state.vigente_contrato ? '1' : '0');
            data.append("departamento_id", this.state.departamento_id);

            console.log(this.state.fecha_inicio_contrato);
            console.log(this.state.fecha_fin_contrato);
            console.log(this.state.precio_contrato);
            console.log(this.state.tipo_contrato);
            console.log(this.state.vigente_contrato);
            console.log(this.state.departamento_id);

            axios.post(url, data).then((res) => {
                console.log(res);
                cookies.remove('idDepa');
                window.location.href = "./depa";
            });

        }
    };

    render() {
        const { residentesSeleccionados } = this.state;
        return (
            <>
                
                <Container className="custom-form">
                    <Row>
                        <Col sm={12}>
                            <h2 className="text-center mb-5">Crear contrato</h2>
                            <form onSubmit={this.storeResident}>
                                <FormGroup className="mb-4">
                                    <Label
                                        className="label-custom"
                                    >
                                        Fecha de inicio del contrato
                                    </Label>
                                    <Input
                                        id="inputRegistro"
                                        type="date"
                                        name="fecha_inicio_contrato"
                                        onChange={this.handleInput}
                                    />
                                    {this.state.errors.fecha_inicio_contrato && (
                                        <span>{this.state.errors.fecha_inicio_contrato}</span>
                                    )}
                                </FormGroup >
                                <FormGroup className="mb-4">
                                    <Label
                                        className="label-custom"
                                    >
                                        Fecha de fin del contrato
                                    </Label>
                                    <Input
                                        id="inputRegistro"
                                        type="date"
                                        name="fecha_fin_contrato"
                                        onChange={this.handleInput}
                                    />
                                    {this.state.errors.fecha_fin_contrato && (
                                        <span>{this.state.errors.fecha_fin_contrato}</span>
                                    )}
                                </FormGroup >
                                <FormGroup className="mb-4">
                                    <Label
                                        className="label-custom"
                                    >
                                        Precio
                                    </Label>
                                    <Input
                                        id="inputRegistro"
                                        type="text"
                                        name="precio_contrato"
                                        placeholder="Ingrese el monto del contrato"
                                        onChange={this.handleInput}
                                    />
                                    {this.state.errors.precio_contrato && (
                                        <span>{this.state.errors.precio_contrato}</span>
                                    )}
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Label
                                        className="label-custom"
                                    >
                                        Tipo de contrato
                                    </Label>
                                    <Input
                                        type="select"
                                        name="tipo_contrato"
                                        id="tipo_contrato"
                                        onChange={this.handleInput}
                                    >
                                        <option disabled selected>{" "} Seleccione un tipo de contrato</option>
                                        <option value="Venta">Venta</option>
                                        <option value="Alquiler">Alquiler</option>
                                        <option value="Anticretico">Anticretico</option>

                                    </Input>
                                </FormGroup>
                                <div>
                                    <h1>Residentes</h1>
                                    <ul>
                                    {residentesSeleccionados.map((residente, index) => (
                                        <li key={index}>{residente.nombre_residente} {residente.apellidos_residente}
                                        <button type="button" onClick={() => this.eliminarListaResidente(residente.id)}>
                                            EliminarResidente
                                        </button>
                                        <Input
                                            type="select"
                                            name="tipo_residente"
                                            id="tipo_residente"
                                            onChange={this.handleInput}
                                        >
                                            <option value="Residente">Residente</option>
                                            <option value="Propietario">Propietario</option>

                                        </Input>
                                        </li>
                                        
                                    ))}
                                    
                                    </ul>
                                </div>
                                <Button size="lg" type="button" className="custom-button mx-auto d-block"
                                    style={{ fontWeight: 'bold' }} onClick={this.toggleModal}
                                >
                                    +
                                </Button>

                                {this.state.mostrarModal && (
                                <ModalMostrarResidentes
                                    agregarResidente={this.agregarResidente}
                                    estado1={this.state.mostrarModal}
                                    toggleModal={this.toggleModal}
                                />
                                )}
                                
                                <Button size="lg" type="submit" className="custom-button mx-auto d-block"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    Registrar
                                </Button>
                            </form>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}
export default CrearContrato;
