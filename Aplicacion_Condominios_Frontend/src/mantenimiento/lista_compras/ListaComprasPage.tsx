import React from 'react'
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Link } from "react-router-dom";
import "./style.css";


import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

  
export default function ListaCompras() {
  return (
    <>
      <div className="content__list">
        <div className="">
          <h2>Lista de Compras</h2>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="">Solicitud</th>
              <th className="">Categoría</th>
              <th className="">Precio total</th>
              <th className="">Fecha</th>
              <th></th>
              <th></th>
              <th className="">Detalles</th>
              <th className="">Acciones</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Solicitud1 </td>
              <td> Electricidad </td>
              <td> 100 Bs </td>
              <td> 25 de mayo </td>
              <td></td>
              <td></td>
              <td >
              <Accordion className='tamanio_acordion'>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Compras solicitud 1  
                      </AccordionSummary>
                      <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </AccordionDetails>
                    </Accordion>
              </td>
              <td className="">
                <div className="button-container">
                  <Link to="/changelog/registro_compras" className="block block__texto">
                    <button className='personalize_button1'>
                      <CreateOutlinedIcon className='tamIcon' />
                    </button>
                  </Link>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
