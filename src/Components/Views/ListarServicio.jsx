import React, { useState, useEffect } from 'react';
import '../Styles/Servicios.css';

const Listar = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const response = await fetch('https://localhost:7051/api/Servicio');
        if (!response.ok) {
          throw new Error('Error al obtener los servicios.');
        }
        const data = await response.json(); 
        setServicios(data); 
      } catch (error) {
        console.error(error);
      }
    };

    obtenerServicios();
  }, []);

  return (

    <div>
      <div className="titulo-servicios">
        <h2>Servicios que Ofrecemos</h2>
      </div>
      <div className="contenedor-servicio">
        {servicios.map((servicio) => (
          <div key={servicio.servicioId} className="detalle-servicio">
            <figure>
              <img src={`https://localhost:7051/Uploads/${servicio.imagen}`} alt="" />
            </figure>
            <div className="contenido-card">
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
              <hr />
              <br />
              <h4>Desde S/. {servicio.precio}0</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listar;
