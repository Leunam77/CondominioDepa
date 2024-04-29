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
            <button onClick={fetchEquipment} type='button' className='btn btn-outline-primary me-2'> Refrescar </button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        {/* <th>Id_Area Común</th> */}
                        <th>Area común</th>
                        <th>Acción</th>
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
                                    {/* <td>{equipments.area_comun_id}</td> */}
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


            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <form>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'> ID </label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                    name="id"
                                    defaultValue=""
                                />

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'> Nombre </label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                    name="Nombre"
                                    defaultValue=""
                                />

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'> Descripción </label>
                            <div className='col-sm-8'>
                                <textarea className='form-control'
                                    name="Descripción"
                                    defaultValue=""
                                />

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'> Costo </label>
                            <div className='col-sm-8'>
                                <input className='form-control'
                                    name="Costo"
                                    defaultValue=""
                                />

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'> Costo </label>
                            <div className='col-sm-8'>
                                <select className='form-select'>
                                    name="Costo"
                                    defaultValue=""
                                    <option value='Sala de juegos'>Sala de juegos</option>
                                    <option value='Cafeteria'>Cafeteria</option>
                                </select>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary btn-sm me-3'>Guardar</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <button onClick={showList} type='button' className='btn btn-secondary me-2'> Cancelar </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}