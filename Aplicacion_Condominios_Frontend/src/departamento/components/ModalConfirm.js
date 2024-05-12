import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./customs.css";

const ModalConfirm = (props) => {
	const { isOpen, toggle, confirm, message } = props;

	return (
		<Modal isOpen={isOpen} toggle={toggle} centered>
			<ModalHeader toggle={toggle} className="modalTitle">Confirmación</ModalHeader>
			<ModalBody>
				{message}
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={confirm}>Confirmar</Button>{' '}
<<<<<<< HEAD
=======
				<Button color="danger" onClick={toggle}>Cancelar</Button>
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
			</ModalFooter>
		</Modal>
	);
}

export default ModalConfirm;