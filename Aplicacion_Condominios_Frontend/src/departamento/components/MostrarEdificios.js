import React, { useEffect, useState } from "react";
import axios from "axios";
import imgPrueba from '../../assets/images/backgroundImage.png';
import './DepartamentosCss.css';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardText, Container } from 'reactstrap';

const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';
const cookies = new Cookies();
const MostrarEdificios = () => {
    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);

    const handleClickInfo = () => {
        window.location.href = '/dashboard/departamentos';
    }; //se deberia mostrar los departamentos del edificio?

    return(
        <>
        <Container>
            <h1 className="title">Edificios</h1>
            <div className= "row">
                {[...Array(5)].map((_, index) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" >
                    <div className="d-flex h-100">
                        <Card className="mt-3 mb-3 flex-fill cardDepa" onClick={handleClickInfo}>
                            <CardImg
                                alt="Card image cap"
                                src={imgPrueba}
                                style={{ objectFit: "cover", width: "100%", height: "235px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                            />
                            <CardBody className="d-flex flex-column justify-content-between align-items-stretch">
                                <CardText>
                                    <p id="infoEdifcio">Edificio</p>
                                    <p id="infoEdifcio">N° de pisos:</p>
                                    <p id="infoEdifcio">Bloque:</p>
                                    <p id="infoEdifcio">Descripción:</p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default MostrarEdificios;
