import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [preavisos, setPreavisos] = useState([]);
    const [residentes, setResidentes] = useState({});
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
        fetch(`${endpoint}/obtener-preavisos`)
            .then(response => response.json())
            .then(data => {
                setPreavisos(data.preAvisos);
            })
            .catch(error => {
                console.error('Error fetching preavisos:', error);
            });

        fetch(`${endpoint}/residentes`)
            .then(response => response.json())
            .then(data => {
                const residentesData = {};
                data.forEach(residente => {
                    residentesData[residente.id] = residente;
                });
                setResidentes(residentesData);
            })
            .catch(error => {
                console.error('Error fetching residentes:', error);
            });

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

    const getEmailFromResidenteId = (residenteId) => {
        const residente = residentes[residenteId];
        return residente ? residente.email_residente : '';
    };

    const handleGenerarExpensa = () => {
        // Lógica para generar la expensa
    };

    const handleToggleCobroModal = (preaviso) => {
        setTitulo(`Servicio a pagar: ${preaviso.servicio_pagar}`);
        setCorreo(getEmailFromResidenteId(preaviso.id_propietarioPagar));
        setMonto(preaviso.monto);
        setMensaje(`Descripción de Servicios: ${preaviso.descripcion_servicios}`);
        setIsModalOpen(!isModalOpen);
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
            setServerResponse(response.data.message);
            setError(null);
            setMensaje('');
            setIsModalOpen(false);
            toast.success('Email enviado correctamente');
        } catch (error) {
            setError('Ocurrió un error al procesar el pago.');
        }
    };

    return (
        <div className="container">
            <h2>Pre-Aviso de Expensas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departamento</th>
                        <th>Propietario a Pagar</th>
                        <th>Fecha</th>
                        <th>Descripción de Servicios</th>
                        <th>Servicio a Pagar</th>
                        <th>Monto</th>
                        <th>Generar Expensa</th>
                        <th>Enviar Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {preavisos.map(preaviso => (
                        <tr key={preaviso.id}>
                            <td>{preaviso.id}</td>
                            <td>{preaviso.departamento.nombre_departamento}</td>
                            <td>{preaviso.propietario_pagar}</td>
                            <td>{preaviso.fecha}</td>
                            <td>{preaviso.descripcion_servicios}</td>
                            <td>{preaviso.servicio_pagar}</td>
                            <td>{preaviso.monto}</td>
                            <td>
                                <button className="btn btn-primary" onClick={handleGenerarExpensa}>
                                    Generar Expensa
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleToggleCobroModal(preaviso)}>
                                    Enviar Correo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Notificar pre aviso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} style={{ marginTop: '-1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '100%', maxWidth: '400px', display: 'grid', gap: '10px' }}>
                            <label htmlFor="titulo">Título:</label>
                            {/* Modifica el campo "Título" para que sea editable */}
                            <input id="titulo" type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px', display: 'grid', gap: '10px' }}>
                            <label htmlFor="monto">Monto a cobrar:</label>
                            {/* Modifica el campo "Monto" para que sea editable */}
                            <input id="monto" type="number" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} />
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px', display: 'grid', gap: '10px', marginBottom: '2rem' }}>
                            <label htmlFor="mensaje">Detalle:</label>
                            {/* Modifica el campo "Detalle" para que sea editable */}
                            <textarea id="mensaje" className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', maxWidth: '400px' }}>Notificar</button>
                    </form>


                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default GestionCobro;
