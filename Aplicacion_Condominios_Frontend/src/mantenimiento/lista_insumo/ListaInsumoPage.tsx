import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./style.css";
import {Insumo, getAllInsumos} from "../services/maintenance/insumosService"






const ListaInsumo: React.FC = () => {
    const [datos, setDatos] = useState<Insumo[]>([]);

    useEffect(() => {
      const cargarDatos = async () => {
        const datosObtenidos = await getAllInsumos();
        setDatos(datosObtenidos);
      };
  
      cargarDatos();
    }, []);
    return(
        <>
            <div className="content__insu">
                <div className="row">
                    <div className="col">
                        <h2>Lista de Insumos</h2>
                    </div>
                    <div className="col button__insu">
                       
                        <Link to="/changelog/registrar_insumo" className="block block__texto">                 
                            Registrar
                        </Link>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="">Solicitud</th>
                            <th className="">Categoria</th>
                            <th className="">Encargado</th>
                            <th className="">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {datos.map((insumos) => (
                        <tr key={insumos.idInsumo}>
                            <td>{insumos.idSolicitud}</td>
                            <td>{insumos.solicitud.categoria.catnombre}</td>
                            <td>{insumos.solicitud.encargado}</td>
                            <td className="ajustar__insu">
                                <button type="button">
                                    <CreateOutlinedIcon fontSize="large" />
                                </button>
                                <button type="button">
                                    <DeleteOutlinedIcon fontSize="large" />
                                </button>
                            </td>
                        </tr>
                    ))}

                   
                    </tbody>
                </table>
            </div>       
        </>
    );
}

export default ListaInsumo;