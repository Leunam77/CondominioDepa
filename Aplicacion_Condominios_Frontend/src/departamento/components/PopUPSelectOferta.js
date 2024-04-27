import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'; // Added import for useState
import "./PopUpCss.css";

const SeleccionarOferta = (props) => {
	const { isOpen, toggle, confirm } = props;

    const [ventaChecked, setVentaChecked] = useState(false);
    const [alquilerChecked, setAlquilerChecked] = useState(false);
    const [anticreticoChecked, setAnticreticoChecked] = useState(false);

	return (
		<Modal isOpen={isOpen} toggle={toggle} centered>
			<ModalHeader ></ModalHeader>
			<ModalBody id="modalBodyPU">
                <p>¿En qué modalidad desea ofertar la propiedad?</p>
                <FormGroup check className="contenedorCheckPU">
                    <Label check id="checkPU">
                        <Input type="checkbox" checked={ventaChecked} onChange={() => setVentaChecked(!ventaChecked)} />{' '}
                        Venta
                    </Label>
                    <Label check id="checkPU">
                        <Input type="checkbox" checked={alquilerChecked} onChange={() => setAlquilerChecked(!alquilerChecked)} />{' '}
                        Alquiler
                    </Label>
                    <Label check id="checkPU">
                        <Input type="checkbox" checked={anticreticoChecked} onChange={() => setAnticreticoChecked(!anticreticoChecked)} />{' '}
                        Anticrético
                    </Label>
                </FormGroup>
			</ModalBody>
			<ModalFooter id="modalFooterPU">
				<Button color="primary" className="confirmBoton" onClick={confirm}>Confirmar</Button>{' '}
			</ModalFooter>
		</Modal>
	);
}

export default SeleccionarOferta;