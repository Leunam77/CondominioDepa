import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import "./style.css";

 

export default function RegistroInsumo() {
  return (
    <>
      <div className="content__regisInsu">
        <h2 className="">Registrar Insumo</h2>
        <Box
          component="form"
          sx={{
          "& .MuiTextField-root": { m: 0.8, width: "40ch", display: "flex" },
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
                select                    
              /> 
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
              /> 
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
          
          <div className="row my-3">             
            <div className="col">
              <TextField
                required
                id="outlined"
                placeholder="Ingrese Nombre del Insumo"
              /> 
            </div>            
            

            <button 
              className="col-2 btn btn-success m_personalizado"
              type="button"
            >
              <AddOutlinedIcon
                fontSize="large"
              />
              <span className="aumentar__fontsize">Añadir</span>
            </button>              
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Borrar</th>
                <th>Insumo</th>
              </tr>
            </thead>
            <tbody>        
                <tr>
                  <td>
                    <ClearOutlinedIcon
                      className="c-dark-blue"
                      fontSize="large"
                    />
                  </td>
                  <td>focos</td>
                </tr>        
            </tbody>
          </table>
                      
          <button 
            className="block margin-x-auto"
            type="submit"
          >
          Guardar
          </button>        
        </Box>
      </div>
    </>
  )
}