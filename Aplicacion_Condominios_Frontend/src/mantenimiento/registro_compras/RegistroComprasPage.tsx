import React from 'react'
import { MenuItem, TextField } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./style.css";
import Box from "@mui/material/Box";


export default function RegistroCompras() {
  return (
    <>
      <div className="content__registro">
        <div className="">
          <h2>Registro de Compras</h2>
        </div>
        {/* Desplegable categoria y solicitud */}
        <Box
          component="form"
          className="form-container"
          noValidate
        >
          <div className="form-row">
            <div className="form-item">
              <label htmlFor="outlined-select-currency1">Categoría</label>
              <TextField
                id="outlined-select-currency1"
                select
              >
                <MenuItem>
                  Opción 1
                </MenuItem>
              </TextField>
            </div>
            <div className="form-item">
              <label htmlFor="outlined-select-currency2">Solicitud</label>
              <TextField
                id="outlined-select-currency2"
                select
              >
                <MenuItem>
                  Opción 2
                </MenuItem>
              </TextField>
            </div>
          </div>
        </Box>

      {/* Tabla */}

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="">Cantidad</th>
              <th className="">Nombre del artículo</th>
              <th className="">Precio unitario</th>
              <th className="">Precio total</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <td> 5 uds.</td>
              </td>
              <td> Valdes </td>
              <td>
                <TextField
                  id="outlined"
                  type="number"
                  placeholder=" Bs."
                  sx={{
                    width: '60px',
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '90%'
                    }
                  }}
                />
              </td>
              <td> 50 Bs.</td>
              <td>
                <button className='button_color'>
                  <DeleteOutlinedIcon  />
                </button>
              </td>
            </tr>
            <tr> {/*//////////////////////////////////////////////////////////////////////////*/}
              <td className="tr__bg-white fw-bold">Total general</td>
              <td className="tr__bg-white"></td>
              <td> 5 Bs.</td>
              <td> 50 Bs.</td>
              
              <td className="tr__bg-white"></td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <button className="block_button w-40">Registrar</button>
        </div>
      </div>
    </>
  )
}
