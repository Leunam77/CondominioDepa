import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import "./style.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/maintenance/categoryService";
import { getPersonalByCategory } from "../services/maintenance/personalExternoService";
import { getSolicitudByEncargadoId } from "../services/maintenance/solicitudMantenimientoService";


interface Category {
  id: number;
  catnombre: string;
  catdescripcion: string;
  disabled: boolean;
}

interface PersonalExternoResponse {
  idPersonalExterno: number;
  nombre: string;
  telefono: string;
  direccion: string;
  categoria: { id: number; catnombre: string };
}

interface SolicitudServicioResponse {
  idRegistroSolicitud: number;
  idCategoria: number;
  idEstado: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerReferencia: string;
  encargado: string;
  fechaSolicitud: string;
  fechaFinalizado: string;
  categoria: { id: number; catnombre: string };
  estado: {
    idEstado: number;
    nombreEstado: string;
  };
}

interface InsumoItem {
  id: number,
  nombre: string,
}

export default function RegistroInsumo() {

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [personalList, setPersonalList] = useState<PersonalExternoResponse[]>([]);
  const [solicitudList, setSolicitudList] = useState<SolicitudServicioResponse[]>([]);

  const [nombreInsumo, setNombreInsumo] = useState<string>("");
  const [insumosList, setInsumosList] = useState<InsumoItem[]>([]);

  useEffect(() => {
    allCategories();
  }, [])

  const allCategories = async () => {
    const response = await getAllCategories();
    setCategoryList(response);
  }

  const allPersonalList = async (categoryId: string) => {
    const categoryIdNumber: number = parseInt(categoryId);
    const response = await getPersonalByCategory(categoryIdNumber);
    setPersonalList(response);
  }

  const allSolicitudList = async (encargadoId: number) => {
    const response = await getSolicitudByEncargadoId(encargadoId);
    setSolicitudList(response);
  }


  const agregarInsumo = () => {
    if (nombreInsumo.slice() !== "") {
      const newInsumo = { id: insumosList.length + 1, nombre: nombreInsumo }
      const newInsumosList = [...insumosList, newInsumo];
      setInsumosList(newInsumosList);
      setNombreInsumo("");
    }
  }

  const handleDeleteItemInsumo = (idInsumo: number) => {
    const newInsumosList = insumosList.filter(element => {
      if (element.id !== idInsumo) {
        return element
      }
    })

    setInsumosList(newInsumosList);
  }


  return (
    <>
    <div className="content__insu">
      <div className="content__regisInsu">
        <h2 className="">Registrar Insumo</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 0.8, width: "42ch", display: "flex" },
          }}
          noValidate
        >
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Categoría</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                onChange={(event) => allPersonalList(event.target.value)}
                select
              >
                {categoryList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.catnombre}
                  </MenuItem>
                ))}

              </TextField>
            </div>
          </div>
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Encargado</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                select
              >
                {personalList.map((option) => (
                  <MenuItem key={option.idPersonalExterno} value={option.nombre}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="row">
            <div className="col-4 align-right-inputss">
              <label htmlFor="outlined-select-currency">Solicitud</label>
            </div>
            <div className="col-8">
              <TextField
                id="outlined-select-currency"
                select
              />
            </div>
          </div>

          <div className="example">
            <div></div>
            <div className="subtitule">Agregar Insumo</div>
            <div></div>
          </div>

          <div className="row__group2">



            <div className="row__group">

              <div className="row__input">
                <TextField
                  required
                  id="outlined"
                  value={nombreInsumo}
                  onChange={(event) => setNombreInsumo(event.target.value)}
                  placeholder="Ingrese Nombre del Insumo"
                />
              </div>


              <button
                className="col-2 btn btn-success m_personalizado"
                type="button"
                onClick={agregarInsumo}
              >
                <span className="aumentar__fontsize">Agregar</span>
              </button>
            </div>

            <div className="table__container">
              <table className="table table__space">
                <thead>
                  <tr >
                    <th className="der">Insumo</th>
                    <th className="izq">Borrar</th>

                  </tr>
                </thead>
                {insumosList.map(element => (
                  <tbody className="tbody__space">
                    <tr className="tr__color">
                      <td className="der">{element.nombre}</td>
                      <td className="izq">
                        <ClearOutlinedIcon
                          className="c-dark-blue"
                          fontSize="large"
                          onClick={() => handleDeleteItemInsumo(element.id)}
                        />
                      </td>

                    </tr>
                  </tbody>
                ))}
              </table>
              <button
                className="block margin-x-auto"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </div>
          
          
        </Box>
      </div>
      </div>
    </>
  )
}