import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';

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

const cookies = new Cookies();

function EmployeeEdit() {

  const id = cookies.get('id_empleado_seleccionado');

  const [empleado, setEmpleado] = useState([]);

  let nombre_empleado = "";

  const [values, setValues] = useState({
    nombre: "",
    apellido : "",
    correo : "",
    celular : "",
    genero : "",
    fecha_contratacion : "",
  });

  useEffect(()=>{
    getEmpleado();
    console.log(id)
  }, []);

  const getEmpleado =  async (e) => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_employee/${id}`)
    setValues({
        nombre: respuesta.data.empleado.nombre,
        apellido : respuesta.data.empleado.apellido,
        correo : respuesta.data.empleado.correo,
        celular : respuesta.data.empleado.celular,
        genero : respuesta.data.empleado.genero,
        fecha_contratacion : respuesta.data.empleado.fecha_contratacion,
    });
    console.log(values)
    nombre_empleado = respuesta.data.empleado.nombre
    console.log(respuesta.data)
    setEmpleado(respuesta.data.empleado)
   };

  const handleInput = (e) => {
    console.log("ASASS")
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const guardarInformacion =  async (e) => {
    e.preventDefault(); 
    console.log(values)

    const data = new FormData();

    data.append("nombre", values.nombre);
    data.append("apellido", values.apellido);
    data.append("correo", values.correo);
    data.append("celular", values.celular);
    data.append("genero", "M");
    data.append("fecha_contratacion", values.fecha_contratacion);

    const res = await axios.post(`http://127.0.0.1:8000/api/update_employee/${id}`, data);

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
              Editar de Informacion
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
                  onChange={handleInput}
                  value={values.nombre}
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
                  onChange={handleInput}
                  value={values.apellido}
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
                  onChange={handleInput}
                  value={values.correo}
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
                  onChange={handleInput}
                  value={values.celular}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  name="fecha_contratacion"
                  wrapperClass="mb-4"
                  label="fecha_contratacion"
                  size="lg"
                  id="form5"
                  type="date"
                  onChange={handleInput}
                  value={values.fecha_contratacion}
                />
              </MDBCol>
            </MDBRow>

            <Button block variant="warning" onClick={guardarInformacion}>
              Guardar
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default EmployeeEdit;
