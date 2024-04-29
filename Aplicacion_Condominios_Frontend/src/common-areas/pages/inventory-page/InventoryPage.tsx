import React, { useState, ReactElement, useEffect } from 'react'

interface Equipment {
    id: number;
    nombre: string;
    descripcion: string;
    costo: number;
    area_comun_id: number;
    area_comun_nombre: string;
}
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
    const [equipment, setEquipment] = useState<Equipment[]>([]);

    function fetchEquipment() {
        fetch("http://localhost:3004/equipment")
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
                        <th>Nombre</th>
                        <th>Description</th>
                        <th>Costo</th>
                        <th>Area común</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equipment.map((equipments, index) => {
                            return (
                                <tr key={index}>
                                    <td>{equipments.id}</td>
                                    <td>{equipments.nombre}</td>
                                    <td>{equipments.descripcion}</td>
                                    <td>{equipments.costo}</td>
                                    <td>{equipments.area_comun_nombre}</td>
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