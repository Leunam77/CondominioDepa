import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./report-Page.css";
import { getResidents } from "../../../shared/services/resident.service";

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

const equipmentData = [
  {
    id: "1",
    nombre: "Mesa de Ping Pong",
    cantidad: "4",
    descripcion: "Mesa profesional para jugar ping pong.",
    costo: 1600,
    area_comun_id: 101,
    area_comun_nombre: "Sala de Juegos",
  },
];

function ReportPage() {
  const [formData, setFormData] = useState<FormData>({
    nombreUsuario: "",
    nombreArea: "",
    nombreProducto: "",
    costo: "",
    costoReponer: "",
    cantidadActual: "",
    cantidadReponer: "",
    situacion: "",
    informacionAdicional: "",
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

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "nombreProducto") {
      const selectedEquipment = equipmentData.find(
        (item) => item.nombre === value
      );
      if (selectedEquipment) {
        setFormData((prevState) => ({
          ...prevState,
          costo: selectedEquipment.costo.toString(),
          cantidadActual: selectedEquipment.cantidad,
        }));
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const selectedEquipment = equipmentData.find(
    (item) => item.nombre === formData.nombreProducto
  );

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Crear Reporte</h2>
      <div className="form-group">
        <label>Nombre Residente:</label>
        <select
          name="nombreUsuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
        >
          <option value="">Seleccione un residente</option>
          {/* Agrega las opciones de residentes aquí */}
        </select>
      </div>
      <div className="form-group">
        <label>Nombre Área Común:</label>
        <select
          name="nombreArea"
          value={formData.nombreArea}
          onChange={handleChange}
        >
          <option value="">Seleccione un área común</option>
          {commonAreas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Nombre Producto:</label>
        <select
          name="nombreProducto"
          value={formData.nombreProducto}
          onChange={handleChange}
        >
          <option value="">Seleccione un producto</option>
          {equipmentData.map((item) => (
            <option key={item.id} value={item.nombre}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Costo:</label>
        <p>{selectedEquipment ? selectedEquipment.costo : ""}</p>
      </div>
      <div className="form-group">
        <label>Costo a Reponer:</label>
        <input
          type="number"
          name="costoReponer"
          value={formData.costoReponer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Cantidad Actual:</label>
        <p>{selectedEquipment ? selectedEquipment.cantidad : ""}</p>
      </div>
      <div className="form-group">
        <label>Cantidad a Reponer:</label>
        <input
          type="number"
          name="cantidadReponer"
          value={formData.cantidadReponer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Situación:</label>
        <select
          name="situacion"
          value={formData.situacion}
          onChange={handleChange}
        >
          <option value="roto">Roto</option>
          <option value="perdido">Perdido</option>
        </select>
      </div>
      <div className="form-group">
        <label>Información Adicional:</label>
        <textarea
          name="informacionAdicional"
          value={formData.informacionAdicional}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Reportar</button>
    </form>
  );
}

export default ReportPage;
