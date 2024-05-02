// Importa las librerías y los componentes necesarios
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import QRCode from "qrcode.react"; // Importa la librería qrcode.react

const endpoint = "http://localhost:8000/api";

// Define el componente FormularioPagoArea
const FormularioPagoArea = () => {
  // Define los estados necesarios
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [errors, setErrors] = useState({});
  const [showQR, setShowQR] = useState(false); // Estado para mostrar u ocultar el QR

  // Efecto para imprimir un mensaje cuando el componente se monta
  useEffect(() => {
    console.log("Componente FormularioPagoArea montado");
  }, []);

  // Función para manejar cambios en los campos de entrada
  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "monto":
        setMonto(value);
        break;
      case "formaPago":
        setFormaPago(value);
        break;
      default:
        break;
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validar campos
    if (!monto.trim()) {
      validationErrors.monto = "Este campo es obligatorio";
    }

    if (!formaPago.trim()) {
      validationErrors.formaPago = "Seleccione una forma de pago";
    }

    // Establecer errores
    setErrors(validationErrors);

    // Si no hay errores, manejar la lógica de pago
    if (Object.keys(validationErrors).length === 0) {
      console.log("Monto:", monto);
      console.log("Forma de pago:", formaPago);
      if (formaPago === "qr") {
        setShowQR(true);
      }
    }
  };

  // Retornar el componente JSX
  return (
    <Container className="custom-form">
      <Row>
        <Col sm={12}>
          <h2 className="text-center mb-5">Pagar Área Común</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="monto">Monto:</Label>
              <Input
                type="number"
                name="monto"
                id="monto"
                value={monto}
                onChange={handleInput}
                required
              />
              {errors.monto && <span>{errors.monto}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="formaPago">Forma de Pago:</Label>
              <Input
                type="select"
                name="formaPago"
                id="formaPago"
                value={formaPago}
                onChange={handleInput}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="qr">Pago por QR</option>
              </Input>
              {errors.formaPago && <span>{errors.formaPago}</span>}
            </FormGroup>
            <Button type="submit" color="primary">
              Pagar
            </Button>
          </Form>
          {showQR && (
            <div className="text-center mt-3">
              <h3>Escanea el siguiente código QR para realizar el pago:</h3>
              <QRCode value="https://www.example.com" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

// Exportar el componente FormularioPagoArea
export default FormularioPagoArea;
