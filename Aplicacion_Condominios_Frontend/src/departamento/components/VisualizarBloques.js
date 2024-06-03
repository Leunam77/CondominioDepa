import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle , CardText} from 'reactstrap';
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

    const handleClickEdificios = (idBloque) => {
        cookies.set('idBloque', idBloque);
        window.location.href = '/dashboard/edificios';
    };
    return (
        <>
            <h1 className="title">Bloques</h1>
            <div className="row">
                {bloques.map((bloque) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={bloque.id}>
                        <Card className="mt-3 mb-3 flex-fill cardDepa" onClick={() => handleClickEdificios(bloque.id)}>
                            <CardImg
                                alt="Card image cap"
                                src={`${endpointImg}/${bloque.imagen_bloque}`}
                                style={{ objectFit: "cover", width: "100%", height: "235px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                            />
                            <CardBody className="d-flex flex-column justify-content-between align-items-stretch">
                                <CardTitle>
                                    <p id="infoEdifcio">Bloque: {bloque.nombre_bloque}</p>
                                </CardTitle>
                                <CardText>
                                    <p id="infoEdifcio">Descripción: {bloque.descripcion_bloque}</p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
export default VisualizarBloques;
