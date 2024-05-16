import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'reactstrap';

const ComponentToPrint = React.forwardRef(({ titulo, descripcion, imagen, fechaComunicacion, fechaRealizacion }, ref) => {
  return (
    <div className='p-5 ' ref={ref} style={{ textAlign: 'center', paddingTop:'10px' }}>
      <h2 className='h1'>{titulo}</h2>
      <p >{descripcion}</p>
      <p>Fecha de comunicación: {fechaComunicacion}</p>
      <p>Fecha de realización: {fechaRealizacion}</p>
      {imagen && <img src={URL.createObjectURL(imagen)} alt="Imagen" style={{ maxWidth: '200px', marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }} />}
      <p>Atte: Direccion</p>
    </div>
  );
});

const Imprimir = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState(null);
  const [fechaComunicacion, setFechaComunicacion] = useState('');
  const [fechaRealizacion, setFechaRealizacion] = useState('');
  const componentRef = useRef();

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    const imageURL = URL.createObjectURL(file);
    setImagenURL(imageURL);
  };

  const handleFechaComunicacionChange = (e) => {
    setFechaComunicacion(e.target.value);
  };

  const handleFechaRealizacionChange = (e) => {
    setFechaRealizacion(e.target.value);
  };

  return (
    <div className="container mt-5 bg-body-secondary">
      <div className="p-5">
        <h2>Notificación</h2>
        <div className="mb-3">
          <label>Título:</label>
          <input type="text" value={titulo} onChange={handleTituloChange} className="form-control" />
        </div>
        <div className="descripcion mb-3">
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={handleDescripcionChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Fecha de comunicación:</label>
          <input type="date" value={fechaComunicacion} onChange={handleFechaComunicacionChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Fecha de realización:</label>
          <input type="date" value={fechaRealizacion} onChange={handleFechaRealizacionChange} className="form-control" />
        </div>
        <div className="imagen mb-3">
          <label>Imagen:</label>
          <input type="file" accept="image/*" onChange={handleImagenChange} className="form-control" />
          {imagenURL && <img src={imagenURL} alt="Imagen seleccionada" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <ReactToPrint
            trigger={() => <Button className='bg-primary text-white' color='light'>Imprimir</Button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <ComponentToPrint
          ref={componentRef}
          titulo={titulo}
          descripcion={descripcion}
          imagen={imagen}
          fechaComunicacion={fechaComunicacion}
          fechaRealizacion={fechaRealizacion}
        />
      </div>
    </div>
  );
};

export default Imprimir;
