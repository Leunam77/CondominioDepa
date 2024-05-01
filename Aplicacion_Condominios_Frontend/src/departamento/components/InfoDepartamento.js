
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "./Fondo.css";
import "./InfoDep.css";
import { Card } from 'reactstrap';
const endpoint = "http://localhost:8000/api";
const endpointImg = "http://localhost:8000";
const cookies = new Cookies();

const InfoDepartamento = () => {
    const [departamentos, setDepartamentos] = useState ([]);
    const [edificios, setEdificios] = useState ([]);
    const [bloques, setBloques] = useState ([]);
    const [contratos, setContratos] = useState ([]);
    const [residentes, setResidentes] = useState ([]);
    useEffect(() => {
        const idDep = cookies.get('idDepa');
        obtenerDatosDepartamento(idDep);
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    }

const  obtenerDatosDepartamento = async (idDepartamento) => {
        try {
            const response = await axios.get(`${endpoint}/departamento/${idDepartamento}`);
            const departamentoSelec = response.data;
            setDepartamentos(departamentoSelec);

            const contrato = await axios.get(`${endpoint}/contratoDep/${idDepartamento}`);
            const contratoSelec = contrato.data;
            console.log("contratos", contratoSelec)
            setContratos(contratoSelec.contratos);

            const edificio = departamentoSelec.edificio_id;
            console.log("edificio id ", edificio)
            const edificioBus = await axios.get(`${endpoint}/edificio/${edificio}`);
            const edificioSelect = edificioBus.data;
            setEdificios(edificioSelect);

            const bloque = edificioSelect.bloque_id;
            console.log("bloque id ", bloque)
            const bloqueBus = await axios.get(`${endpoint}/bloque/${bloque}`);
            const bloqueSelect = bloqueBus.data;
            setBloques(bloqueSelect);


            const residente = await axios.get(`${endpoint}/residentes-by-contrato/${contratoSelec.id}`);
            const residenteSelec = residente.data;
            console.log("residentes", residenteSelec)
            setResidentes(residenteSelec.residentes);


        } catch (error) {
            console.error('Error al obtener datos del departamento:', error);
        }
    };
        return (
            <div>
            <div className="background-image"></div>
            <div className="contenedor">
                <div className= "info-departamento">
                    <div className= "infoText-departamento">
                        <h1 id="titulo-infDep"><b>Informacion del departamento {departamentos.nombre_departamento}</b></h1>
                        <h2 id="text-infDep"><b>Bloque: </b>{bloques.nombre_bloque}</h2>
                        <h2 id="text-infDep"><b>Edificio: </b>{edificios.nombre_edificio}</h2>
                        <h2 id="text-infDep"><b>Piso: </b>{departamentos.piso}</h2>
                        <h2 id="text-infDep"><b>Numero de habitaciones: </b>{departamentos.numero_habitaciones}</h2>
                        <h2 id="text-infDep"><b>Amoblado: </b>{departamentos.amoblado === 1 ? "si" : "no"}</h2>
                        <h2 id="text-infDep"><b>Superficie: </b>{departamentos.superficie}</h2>
                        <h2 id="text-infDep"><b>Estado: </b>{departamentos.disponibilidad === 1 ? "disponible" : "ocupado"}</h2>
                        <h2 id="text-infDep"><b>Descripción: </b>{departamentos.descripcion_departamento}</h2>
                    
                        {contratos && contratos.length > 0 && (
                        <div>
                            <h1 id="text-subtit"><b>Contratos Activos:</b></h1>
                            <div className="contenedorContratoinf">
                            {contratos.map((contrato) => (
                                <Card className="contratoinf" key={contrato.id}>
                                    <span id="tupla">
                                        <h2 id="text-infDep"><b>Fecha inicio: </b>{formatDate(contrato.fecha_inicio_contrato)}</h2>
                                        <h2 id="text-infDep"><b>Fecha fin:</b>{formatDate(contrato.fecha_fin_contrato)}</h2>
                                    </span>
                                    <span id="tupla">
                                        <h2 id="text-infDep"><b>Monto: </b>{contrato.precio_contrato} $</h2>
                                        <h2 id="text-infDep"><b>Tipo de contrato: </b>{contrato.tipo_contrato}</h2>
                                    </span>
                                </Card>
                            ))}
                            </div>
                        </div>
                        )}
                            
                        {residentes && residentes.length > 0 && (
                        <div>
                            <h1 id="text-subtit"><b>Residentes:</b></h1>
                            <div className="contenedorResidente">
                            {residentes.map((residente) => (
                                <Card className="contratoinf" key={residente.id}>
                                    <span id="tupla">
                                        <h2 id="text-infDep"><b>Nombre: </b>{residente.nombre_residente}</h2>
                                        <h2 id="text-infDep"><b>Apellido: </b>{residente.apellido_residente}</h2>
                                    </span>
                                    <span id="tupla">
                                        <h2 id="text-infDep"><b>Fecha de nacimiento: </b>{formatDate(residente.fecha_nacimiento_residente)}</h2>
                                        <h2 id="text-infDep"><b>Correo: </b>{residente.correo_residente}</h2>
                                    </span>
                                    <span id="tupla">
                                        <h2 id="text-infDep"><b>Telefono: </b>{residente.telefono_residente}</h2>
                                        <h2 id="text-infDep"><b>tipo de residente: </b>{residente.tipo_residente}</h2>
                                    </span>
                                </Card>
                            ))}
                            </div>
                        </div>
                        )}
                    </div>
                    <div className= "imgInfo-departamento">
                        <img src={`${endpointImg}/${departamentos.imagen_departamento}`} alt="Imagen del departamento" />
                    </div>
            </div>
        </div>
        </div>
    );
}

export default InfoDepartamento;
