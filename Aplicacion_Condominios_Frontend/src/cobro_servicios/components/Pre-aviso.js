import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FormularioCobro() {
  const [titulo, setTitulo] = useState('');
  const [correo, setCorreo] = useState('');
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(null);
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/residentes');
      setResidents(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch residents.');
    }
  };

  const handleResidentSelectionChange = (resident) => {
    if (selectedResident && selectedResident.id === resident.id) {
      setSelectedResident(null);
      setCorreo('');
    } else {
      setSelectedResident(resident);
      setCorreo(resident.email_residente);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cobrar-servicio', {
        titulo,
        correo,
        monto,
        mensaje,
        selectedResident
      });
      setMensaje(response.data.message);
      setError(null);
    } catch (error) {
      setError('Ocurrió un error al procesar el pago.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        {/* Sección izquierda */}
        <div className="col-md-6">
          <h2>Cobrar Servicio</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          <Button variant='primary' onClick={openModal} style={{ width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Seleccionar Residente</Button>
          <Modal show={isModalOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Seleccionar Residente</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {residents.map((resident) => (
                <div key={resident.id} style={{ marginBottom: '5px' }}>
                  <Button
                    variant={selectedResident && selectedResident.id === resident.id ? 'success' : 'secondary'}
                    onClick={() => handleResidentSelectionChange(resident)}
                    style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {resident.nombre_residente} {resident.apellidos_residente}
                  </Button>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeModal}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="correo">Correo electrónico:</label>
            <input
                id="correo"
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                readOnly // Hace que el campo sea solo de lectura
            />
            </div>
        </div>

        {/* Sección derecha */}
        <div className="col-md-6">
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="titulo">Título:</label>
            <input id="titulo" type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="monto">Monto a cobrar:</label>
            <input id="monto" type="number" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="mensaje">Mensaje adicional:</label>
            <textarea id="mensaje" className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Cobrar</button>
        </div>
      </div>
    </div>
  );
}

export default FormularioCobro;
