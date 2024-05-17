import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './report-Page.css';
import { getResidents } from '../../../reservation/services/reservation.service';

interface FormData {
    nombreUsuario: string;
    nombreArea: string;
    nombreProducto: string;
    costo: string;
    costoReponer: string;
    cantidadActual: string;
    cantidadReponer: string;
    situacion: string;
    informacionAdicional: string;
}

interface Resident {
    id: number;
    name: string;
}

function ReportPage() {
    const [formData, setFormData] = useState<FormData>({
        nombreUsuario: '',
        nombreArea: '',
        nombreProducto: '',
        costo: '',
        costoReponer: '',
        cantidadActual: '',
        cantidadReponer: '',
        situacion: '',
        informacionAdicional: ''
    });
    const [commonAreas, setCommonAreas] = useState<string[]>([]);
    useEffect(() => {
        const getCommonAreas = async () => {
            const response = await fetch("http://localhost:8000/api/common-areas");
            const data = await response.json();
            return data;
        };
        getCommonAreas().then((response) => {
            const { data } = response;
            const { commonAreas } = data;
            const commonAreasFormatted = commonAreas.map((area: any) => area.name);
            setCommonAreas(commonAreasFormatted);
        });
    }, []);
    const [residents, setResidents] = useState<Resident[]>([]);

    useEffect(() => {
        getResidents().then((data) => {
            const res = data.map((resident: any) => ({
                id: resident.id,
                name: `${resident.nombre_residente}`,
            }));
            setResidents(res);
        });
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);

    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Crear Reporte</h2>
            <div className="form-group">
                <label>Nombre Residente:</label>
                <select name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange}>
                    <option value="">Seleccione un residente</option>
                    {residents.map((residents) => (
                        return(
                    <option key={residents.id} value={residents.name}>
                        {residents.name}
                    </option>
                    );
                    ))}
            </div>
            <div className="form-group">
                <label>Nombre Área Común:</label>
                <select name="nombreArea" value={formData.nombreArea} onChange={handleChange} />
                <option value="">Seleccione un área común</option>
                {commonAreas.map((area, index) => {
                    return (
                        <option key={index} value={area}>
                            {area}
                        </option>
                    );
                })}
            </div>
            <div className="form-group">
                <label>Nombre Producto:</label>
                <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Costo:</label>
                <input type="number" name="costo" value={formData.costo} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Costo a Reponer:</label>
                <input type="number" name="costoReponer" value={formData.costoReponer} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Cantidad Actual:</label>
                <input type="number" name="cantidadActual" value={formData.cantidadActual} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Cantidad a Reponer:</label>
                <input type="number" name="cantidadReponer" value={formData.cantidadReponer} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Situación:</label>
                <select name="situacion" value={formData.situacion} onChange={handleChange}>
                    <option value="roto">Roto</option>
                    <option value="perdido">Perdido</option>
                </select>
            </div>
            <div className="form-group">
                <label>Información Adicional:</label>
                <textarea name="informacionAdicional" value={formData.informacionAdicional} onChange={handleChange} />
            </div>
            <button type="submit">Reportar</button>
        </form>
    );
}

export default ReportPage;
