import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cookies = new Cookies();

function EmployeHomePage() {

  const [empleados, setEmpleados] = useState([]);
  
  useEffect(()=>{
    getEmpleados();
  }, []);

  const getEmpleados = async () => {

    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_employees`);
    console.log(respuesta)
    setEmpleados(respuesta.data.empleados)
    console.log(empleados)
  }

  const eliminarEmpleado = (id) => {
    console.log(id);

    const url = `http://127.0.0.1:8000/api/delete_employee/${id}`; 
      axios.delete(url).then(respuesta => {
        if(respuesta.data.status === 200){
          console.log(respuesta);
          window.location.reload();
        }
    })
  }

  const editarInformacionEmpleado = (id)  => {
    console.log(id)
    cookies.set("id_empleado_seleccionado", id, { path: "/" });
    window.location.href = "./employeeEdit";
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      

      <Container className="mt-5 mb-5 text-light ">
        <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>Genero</th>
              <th>Fecha de Contratacion</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              return (
                <tr >
                  <td >{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.correo}</td>
                  <td>{empleado.celular}</td>
                  <td>{empleado.genero}</td>
                  <td>{empleado.fecha_contratacion}</td>
                  <td><Button variant="danger" onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</Button> {}
                  <Button variant="info" onClick={() => editarInformacionEmpleado(empleado.id)}>Editar</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      <Row className=''>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <Button variant="success" onClick={() => window.location.href = "./employeeRegister"}>Agregar</Button>
        </Col>
      </Row>
      
    </>
  );
}

export default EmployeHomePage;
