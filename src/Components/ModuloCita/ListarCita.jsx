import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/Cliente.css'; // Importa el archivo CSS que contiene los estilos de la tabla

const ListarCita = () => {
  const { id } = useParams(); // Obtener el id del cliente de los parámetros de la URL
  const [citas, setCitas] = useState([]); // Estado para almacenar las citas

  // Función para obtener las citas del cliente por su id
  const fetchCitasPorIdCliente = (clienteId) => {
    axios.get(`https://localhost:7051/api/Cita/cliente/${clienteId}`)
      .then(response => {
        setCitas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener citas:', error);
      });
  };

  useEffect(() => {
    // Llama a la función para obtener las citas al cargar el componente
    fetchCitasPorIdCliente(id);
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <h1>Módulo Citas</h1>
      <br />
      <br />
      <p>Id del cliente: {id}</p>
      <br />
      <br />
      <table className="table-citas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Servicio</th>
            <th>Fecha de Registro</th>
            <th>Fecha de Cita</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.nroCita}>
              <td className="celda-cita">{cita.nroCita}</td>
              <td className="celda-cita">{cita.tipoServicio}</td>
              <td className="celda-cita">{new Date(cita.fechaRegistro).toLocaleDateString()}</td>
              <td className="celda-cita">{new Date(cita.fechaCita).toLocaleDateString()}</td>
              <td className="celda-cita">{cita.hora}</td>
              <td className="celda-cita">{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarCita;
