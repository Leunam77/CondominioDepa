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
  const [serverResponse, setServerResponse] = useState('');

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
      setServerResponse(response.data.message); // Mensaje de éxito
      setError(null);
      setMensaje(''); // Limpiar el mensaje del formulario
    } catch (error) {
      setError('Ocurrió un error al procesar el pago.'); // Mensaje de error
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Cobrar Servicio</h2>
      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Mostrar mensaje de respuesta del servidor */}
      {serverResponse && <p style={{ color: 'green' }}>{serverResponse}</p>}
      
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
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
        <div className="row">
            <div className="col-md-6">
            <div style={{ display: 'grid', gap: '10px' }}>
                <label htmlFor="correo" style={{ alignSelf: 'center' }}>Correo electrónico:</label>
                <input id="correo" type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            </div>
            <div className="col-md-6">
            <div style={{ display: 'grid', gap: '10px' }}>
                <label htmlFor="titulo" style={{ alignSelf: 'center' }}>Título:</label>
                <input id="titulo" type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label htmlFor="monto" style={{ alignSelf: 'center' }}>Monto a cobrar:</label>
                <input id="monto" type="number" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label htmlFor="mensaje" style={{ alignSelf: 'center' }}>Detalle:</label>
                <textarea id="mensaje" className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
            </div>
            </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ justifySelf: 'end' }}>Cobrar</button>
        </form>

    </div>
  );
}

export default FormularioCobro;
