import { Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import React, { useState } from 'react';

export const RegistrarPersona = () => {
  const [datosPersona, setDatosPersona] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    genero: '',
    celular: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersona(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enviar datos al servidor usando axios
    axios.post('http://127.0.0.1:8000/api/add_persona', datosPersona)
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al enviar los datos:', error);
      });
  };

  return (
    <div fluid className="card p-3 m-5 bg-body-secondary">
      <div className="card-body px-4">
        <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
          Registro de Personas
        </h3>

        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="pl-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="form-label">
                  Nombre(s)
                </label>
                <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="apellido" className="form-label">
                  Apellido(s)
                </label>
                <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleChange} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input type="text" className="form-control" id="correo" name="correo" onChange={handleChange} />
              </div>
            </Col>

            <Col md={6} className="mb-4">
              <div className="fw-bold">Género:</div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="femenino"
                  value="F"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="femenino">
                  Femenino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="masculino"
                  value="M"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="masculino">
                  Masculino
                </label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="celular" className="form-label">
                  Celular
                </label>
                <input type="text" className="form-control" id="celular" name="celular" onChange={handleChange} />
              </div>
            </Col>
          </Row>

          <Button type="submit" block variant="primary" className="float-end">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};
