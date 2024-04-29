import React, { useState, ReactElement, useEffect } from 'react'

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
        fetch("http://localhost:3004/elements")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected server response");
                }
                return response.json()

            })
            .then((data) => {
                //console.log(data);
                setEquipment(data);
            })
            .catch((error) => console.log("Error", error));
    }

    useEffect(() => fetchEquipment(), []);

    return (
        <>
            <h2 className='text-center mb-3'> Lista de elementos </h2>
            <button onClick={showForm} type='button' className='btn btn-primary me-2'> Crear </button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equipment.map((inventory, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                                        <button type='button' className='btn btn-primary btn-sm me-2'>Editar</button>
                                        <button type='button' className='btn btn-danger btn-sm'>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
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