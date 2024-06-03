import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle , Button, label} from 'reactstrap';
import Cookies from 'universal-cookie';
const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const VisualizarBloques = () => {
    const [bloques, setBloques] = useState([]);
    useEffect(() => {
        getAllBloques();
        cookies.remove('idBloque');
    }, []);
    const getAllBloques = async () => {
        try {
            const response = await axios.get(`${endpoint}/bloques-short`);
            const bloques = response.data;
            setBloques(bloques);
        } catch (error) {
            console.error('Error al obtener bloques:', error);
        }
    };
}
export default VisualizarBloques;
