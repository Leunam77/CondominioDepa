import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';

import {
    MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio
  }
  from 'mdb-react-ui-kit';

function EmployeeRegister() {

  const [values, setValues] = useState({
    nombre: "",
    apellido : "",
    correo : "",
    celular : "",
    genero : "",
    ci : "",
  });

  const handleInput = (e) => {
    console.log("ASASS")
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    console.log(values)
    console.log("sds")

    const data = new FormData();

    data.append("nombre", values.nombre);
    data.append("apellido", values.apellido);
    data.append("correo", values.correo);
    data.append("celular", values.celular);
    data.append("genero", values.genero);
    data.append("ci", values.ci);
    data.append("estado_contrato", "Sin contrato");

    const res = await axios.post(`http://127.0.0.1:8000/api/add_employee`, data);

    if (res.data.status === 200) {
      console.log(res);
      /* 
      setValues({
        nombre: "",
        apellido: "",
        correo: "",
        celular: "",
        genero: "",
        fecha_contratacion: "",
      });
      */
      window.location.href = "./";
    }
    
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody className="px-4">
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
              Registro de Empleado
            </h3>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  name="nombre"
                  wrapperClass="mb-4"
                  label="Nombre(s)"
                  size="lg"
                  id="form1"
                  type="text"
                  onBlur={handleInput}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  name="apellido"
                  wrapperClass="mb-4"
                  label="Apellido(s)"
                  size="lg"
                  id="form2"
                  type="text"
                  onBlur={handleInput}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  name="correo"
                  wrapperClass="mb-4"
                  label="Correo"
                  size="lg"
                  id="form3"
                  type="text"
                  onBlur={handleInput}
                />
              </MDBCol>

              <MDBCol md="6" className="mb-4">
                <h6 className="fw-bold">Genero: </h6>
                <MDBRadio
                  name="genero"
                  id="inlineRadio1"
                  value="F"
                  label="Femenino"
                  inline
                  onBlur={handleInput}
                />
                <MDBRadio
                  name="genero"
                  id="inlineRadio2"
                  value="M"
                  label="Masculino"
                  inline
                  onBlur={handleInput}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  name="celular"
                  wrapperClass="mb-4"
                  label="Celular"
                  size="lg"
                  id="form4"
                  type="number"
                  onBlur={handleInput}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  name="ci"
                  wrapperClass="mb-4"
                  label="CI"
                  size="lg"
                  id="form5"
                  type="number"
                  onBlur={handleInput}
                />
              </MDBCol>
            </MDBRow>

            <Button block variant="warning" onClick={handleSubmit}>
              Registrar
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default EmployeeRegister;
