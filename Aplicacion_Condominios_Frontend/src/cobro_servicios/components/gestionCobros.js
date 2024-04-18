import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [departamentos, setDepartamentos] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch(`${endpoint}/obtener-departamentos`)
            .then(response => response.json())
            .then(data => {
                const departamentosArray = Object.entries(data).map(([id, nombre]) => ({ id, nombre }));
                setDepartamentos(departamentosArray);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseModal = () => {
        setShowForm(false);
    };

    return (
        <div className="container">
            <h2>Gestión de Cobro por Departamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departamento</th>
                        <th>Generar formulario pre-aviso</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map(departamento => (
                        <tr key={departamento.id}>
                            <td>{departamento.id}</td>
                            <td>{departamento.nombre}</td>
                            <td>
                                <button className="btn btn-primary" onClick={handleButtonClick}>
                                    Formulario
                                </button>
                                <Modal 
                                    isOpen={showForm} 
                                    onRequestClose={handleCloseModal}
                                    style={{
                                        content: {
                                            top: '50%',
                                            left: '50%',
                                            right: 'auto',
                                            bottom: 'auto',
                                            marginRight: '-50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '400px',
                                            border: '1px solid #ccc',
                                            background: '#fff',
                                            overflow: 'auto',
                                            WebkitOverflowScrolling: 'touch',
                                            borderRadius: '4px',
                                            outline: 'none',
                                            padding: '20px'
                                        }
                                    }}
                                >
                                    <form>
                                        <div className="form-group py-2">
                                            <label htmlFor="serviceType" className="py-2">Tipo de servicio:</label>
                                            <input type="text" className="form-control py-2" id="serviceType" name="serviceType" />
                                        </div>
                                        <div className="form-group py-2">
                                            <label htmlFor="paymentDate" className="py-2">Fecha de pago:</label>
                                            <input type="date" className="form-control py-2" id="paymentDate" name="paymentDate" />
                                        </div>
                                        <div className="form-group py-2">
                                            <label htmlFor="amount" className="py-2">Monto:</label>
                                            <input type="number" className="form-control py-2" id="amount" name="amount" />
                                        </div>
                                        <div className="form-group py-2">
                                            <label htmlFor="message" className="py-2">Mensaje:</label>
                                            <textarea className="form-control py-2" id="message" name="message"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary py-1 mb-2 w-100">Aceptar</button>
                                            <button type="button" className="btn btn-secondary py-1 mt-2 w-100" onClick={handleCloseModal}>Cancelar</button>
                                        </div>
                                    </form>
                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;