
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "./customs.css";
import { Card, CardImg, CardBody, CardTitle , Button } from 'reactstrap';
const endpoint = "http://localhost:8000/api";
const endpointImg = "http://localhost:8000";
const cookies = new Cookies();

const InfoDepartamento = () => {
    const [departamentos, setDepartamentos] = useState ([]);
    const [edificios, setEdificios] = useState ([]);
    const [bloques, setBloques] = useState ([]);
    const [contratos, setContratos] = useState ([]);
    useEffect(() => {
        const idDep = cookies.get('idDepa');
        obtenerDatosDepartamento(idDep);
    }, []);

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

        } catch (error) {
            console.error('Error al obtener datos del departamento:', error);
        }
    };
        return (
            <>
                <div>
                    <img src={`${endpointImg}/${departamentos.imagen_departamento}`}></img>
                    <h1>Informacion del departamento {departamentos.nombre_departamento}</h1>
                    <h2>Bloque: {bloques.nombre_bloque}</h2>
                    <h2>Edificio: {edificios.nombre_edificio}</h2>
                    <h2>Piso: {departamentos.piso}</h2>
                    <h3>Numero de habitaciones: {departamentos.numero_habitaciones}</h3>
                    <h3>Amoblado: {departamentos.amoblado === 1 ? "si" : "no"}</h3>
                    <h3>Superficie: {departamentos.superficie}</h3>
                    <h3>Estado: {departamentos.disponibilidad === 1 ? "disponible" : "ocupado"}</h3>
                    <h3>Descripción: {departamentos.descripcion_departamento}</h3>
                </div>
                <div>
                    <h1>Contratos Activos:</h1>
                    {contratos.map((contrato) => (
                        <Card className="cardDepa" key={contrato.id}>
                            <h3>Fecha inicios: {contrato.fecha_inicio_contrato}</h3>
                            <h3>Fecha fin: {contrato.fecha_fin_contrato}</h3>
                            <h3>Monto: {contrato.precio_contrato} $</h3>
                            <h3>Tipo de contrato: {contrato.tipo_contrato}</h3>
                        </Card>
                    ))}
                </div>
                </>
        );
    
}
export default InfoDepartamento;
