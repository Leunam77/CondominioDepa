import React, { useState, ReactElement } from 'react'

interface ListElementProps {
    showForm: () => void;
}

interface FormElementProps {
    showList: () => void;
}

export default function InventoryPage(): ReactElement {
    const [content, setContent] = useState<ReactElement>(<ListElement showForm={showForm} />);

    function showList(): void {
        setContent(<ListElement showForm={showForm} />);
    }

    function showForm(): void {
        setContent(<FormElement showList={showList} />);
    }

    return (
        <div className='container my-5'>
            {content}
        </div>
    )
}

const ListElement: React.FC<ListElementProps> = ({ showForm }) => {
    const [equipment, setEquipment] = useState([]);

    function fetchEquipment() {

    }

    return (
        <>
            <h2 className='text-center mb-3'> Lista de elementos </h2>
            <button onClick={showForm} type='button' className='btn btn-primary me-2'> Crear </button>
        </>
    );
}

const FormElement: React.FC<FormElementProps> = ({ showList }) => {
    return (
        <>
            <h2 className='text-center mb-3'> Crear nuevo producto </h2>
            <button onClick={showList} type='button' className='btn btn-secondary me-2'> Cancelar </button>
        </>
    );
}