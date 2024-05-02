import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom"; // Importa Link y useParams para la navegación
import { FaMoneyBillWave } from "react-icons/fa"; // Importa el icono de dinero para el botón de Pagar reserva

import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8000/api";

const TablaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchReservas();
  }, [id]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`${endpoint}/common-areas/${id}/reservaPagada`);
      setReservas(response.data.data.reservations); 
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  const handlePagarReserva = (idReserva) => {
    window.location.href = `/cobros/pagar-reserva-area/${idReserva}`;
}

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mb-5">Reservas del área común</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID de Reserva</th>
                <th>Fecha de Reserva</th>
                <th>Hora de Inicio</th>
                <th>Hora de Fin</th>
                <th>Motivo</th>
                <th>Número de Personas</th>
                <th>Reserva Pagada</th>
                <th>Acciones</th> {/* Columna para el botón de Pagar reserva */}
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <tr key={index}>
                  <td>{reserva.id}</td>
                  <td>{reserva.reserved_date}</td>
                  <td>{reserva.start_time}</td>
                  <td>{reserva.end_time}</td>
                  <td>{reserva.reason}</td>
                  <td>{reserva.number_of_people}</td>
                  <td>{reserva.reserva_pagada}</td>
                  <td>
                    {/* Botón de Pagar reserva con el icono de dinero */}
                    <Button color="success" onClick={() => handlePagarReserva(reserva.id)}>
                      <FaMoneyBillWave />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TablaReservas;
