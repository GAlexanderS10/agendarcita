// Importa useState y useEffect
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import '../Styles/Cliente.css'; // Importa el archivo CSS que contiene los estilos de la tabla
import Registrar from '../ModuloMascota/Registrar';
import Editar from './Editar';
import Eliminar from './Eliminar';


const Listar = () => {
  const { id } = useParams(); // Obtener el id del cliente de los parámetros de la URL
  const navigate = useNavigate(); 
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null); 

    // Función para redireccionar a ListarCita
    const handleCrearCita = () => {
      navigate(`/listarcita/${id}`);
    };

  // Función para obtener las mascotas del cliente por su id
  const fetchMascotasPorIdCliente = (clienteId) => {
    axios.get(`https://localhost:7051/api/Mascota/cliente/${clienteId}`)
      .then(response => {
        setMascotas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener mascotas:', error);
      });
  };

  useEffect(() => {
    // Llama a la función para obtener las mascotas al cargar el componente
    fetchMascotasPorIdCliente(id);
  }, [id]);

  const handleDeleteMascota = (mascotaId) => {
    // Filtrar las mascotas para eliminar la que coincide con el ID
    setMascotas((prevMascotas) => prevMascotas.filter((mascota) => mascota.mascotaId !== mascotaId));
  };

  const handleEditMascota = (mascotaId, editedMascota) => {
    // Actualizar la lista de mascotas con la mascota editada
    setMascotas((prevMascotas) =>
      prevMascotas.map((mascota) =>
        mascota.mascotaId === mascotaId ? { ...mascota, ...editedMascota } : mascota
      )
    );
    setSelectedMascota(null); // Cerrar la ventana modal de edición después de actualizar la mascota
  };

  return (
    <div>
      <br />
      <br />
      <h1>Módulo Mascota</h1>
      <br />
      <br />
      <p>Id del cliente: {id}</p>
      <br />
      <br />
      <Registrar fetchMascotasPorIdCliente={fetchMascotasPorIdCliente} clientId={id} />
      <br />
      <br />
      <table className="table-cliente">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo de Mascota</th>
            <th>Raza</th>
            <th>Sexo</th>
            <th>Color</th>
            <th>Fecha de Nacimiento</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.mascotaId}>
              <td className="celda-cliente">{mascota.mascotaId}</td>
              <td className="celda-cliente">{mascota.nombre}</td>
              <td className="celda-cliente">{mascota.tipoMascota}</td>
              <td className="celda-cliente">{mascota.raza}</td>
              <td className="celda-cliente">{mascota.sexo}</td>
              <td className="celda-cliente">{mascota.color}</td>
              <td className="celda-cliente">{new Date(mascota.fechaNacimiento).toLocaleDateString()}</td>
              <td className="celda-cliente">
                {mascota.foto && (
                  <img
                    src={`https://localhost:7051/Uploads/${mascota.foto}`}
                    alt={`Foto de ${mascota.nombre}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </td>
              <td>
              <button
                className="btn-editar-cliente"
                onClick={() => setSelectedMascota(mascota)} // Establecer la mascota seleccionada en el estado
              >
                <i className='bx bx-edit'></i>
              </button>
              <Eliminar
            mascotaId={mascota.mascotaId}
            fetchMascotasPorIdCliente={fetchMascotasPorIdCliente}
            onDelete={handleDeleteMascota} // Pasar la función para manejar la eliminación
          />
               <button className="btn-crear-mascota" onClick={handleCrearCita}>
        <i className='bx bx-task'></i>
      </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMascota && (
      <Editar
      mascota={selectedMascota}
      closeModal={() => setSelectedMascota(null)} // Función para cerrar la ventana modal
      fetchMascotasPorIdCliente={fetchMascotasPorIdCliente}
      onEdit={handleEditMascota} // Pasar la función para manejar la edición
    />
    )}
    </div>
  );
};

export default Listar;
