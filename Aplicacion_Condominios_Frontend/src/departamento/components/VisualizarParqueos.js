import { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Label, Table, InputGroup, Input } from 'reactstrap';

const VisualizarParqueos = () => {
	const [parqueos, setParqueos] = useState([]);
	const [busqueda, setBusqueda] = useState('');

	useEffect(() => {
		getParqueos();
	}, []);

	const getParqueos = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/api/parqueos`);
			const parqueos = response.data;
			const departamento = await axios.get(`http://localhost:8000/api/departamentos`);
			const departamentos = departamento.data;
			parqueos.forEach(parqueo => {
				const depa = departamentos.find(depa => depa.id === parqueo.departamento_id);
				parqueo.departamento_parqueo = depa ? depa.nombre_departamento : 'N/A';
			}
			);
			parqueos.sort((a, b) => a.nombre_parqueo.localeCompare(b.nombre_parqueo));
			setParqueos(parqueos);

			console.log(parqueos);
		} catch (error) {
			console.error("Error al obtener los parqueos:", error);
		}
	}
	const manejarBusqueda = async (e) => {
		setBusqueda(e.target.value);
	}

	return (
		<>
			<Container>
				<Row>
					<Label className="text-center mb-4 titulosForms">
						Visualizar parqueos
					</Label>
				</Row>
				<Row className="d-flex align-items-center justify-content-center">
					<Col md={8}>
						<InputGroup >
							<Input placeholder="Buscar parqueos..." className="buscadorDepa" onChange={manejarBusqueda}
								style={{
									borderRadius: "15px",
									border: "1px solid rgba(0, 0, 0, 0.3)",
									boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
								}}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Table striped responsive bordered className="mt-5">
					<thead className="text-center" >
						<tr>
							<th>Nombre</th>
							<th>Departamento</th>
							<th>Dirección</th>
						</tr>
					</thead>
					<tbody className="visitasTabla">
						{parqueos.filter(parqueo => {
							if (busqueda === "") {
								return parqueo;
							} else if (parqueo.nombre_parqueo.toLowerCase().includes(busqueda.toLowerCase()) || parqueo.direccion_parqueo.toLowerCase().includes(busqueda.toLowerCase()) || parqueo.departamento_parqueo.toLowerCase().includes(busqueda.toLowerCase())) {
								return parqueo;
							}
							return false;
						}).map((parqueo) => (
							<tr key={parqueo.id}>
								<td className="celdaVisita">{parqueo.nombre_parqueo}</td>
								<td className="celdaVisita">{parqueo.departamento_parqueo}</td>
								<td className="celdaVisita">{parqueo.direccion_parqueo}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default VisualizarParqueos;