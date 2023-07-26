// Cliente.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/Cliente.css' // Importa el archivo CSS que contiene los estilos de la tabla
import Modal from './Modal';
import ModalUpdateCliente from './ModalUpdateCliente'; // Importa el nuevo componente
import DeleteModal from './DeleteModal ';
import Search from './Search'; 


const Cliente = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  // Función para obtener los datos de la API y actualizar el estado de los clientes
  const fetchClientes = () => {
    axios.get('https://localhost:7051/api/Cliente')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(() => {
    // Llama a la función para obtener los datos al cargar el componente
    fetchClientes();
  }, []);

  console.log(clientes);


  return (

  <> 
  <br/>
  <br/>
  <h1>Módulo Cliente</h1>
  <br/>
  <br/>
  <Search setClientes={setClientes} /> {/* Agrega el componente de búsqueda */}
  <br/>
    <Modal  fetchClientes={fetchClientes} />
  <br/>
  <br/>
  <hr/>
  <br/>
  <br/>
    <table className="table-cliente">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Doc. de Identidad</th>
          <th>Nro. de Identidad</th>
          <th>Email</th>
          <th>Celular</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  {clientes.map((cliente) => (
    <tr key={cliente.clienteId}>
      <td className="celda-cliente">{cliente.clienteId}</td>
      <td className="celda-cliente">{cliente.nombres}</td>
      <td className="celda-cliente">{cliente.apellidos}</td>
      <td className="celda-cliente">{cliente.tipoDocumento}</td>
      <td className="celda-cliente">{cliente.nroIdentidad}</td>
      <td className="celda-cliente">{cliente.celular}</td>
      <td className="celda-cliente">{cliente.email}</td>
      <td>
      <button className="btn-editar-cliente" onClick={() => setSelectedCliente(cliente)}>
                  <i className='bx bx-edit'></i>
                </button>
                <DeleteModal clienteId={cliente.clienteId} fetchClientes={fetchClientes} />
                <button
  className="btn-crear-mascota"
  onClick={() => {
    console.log('clienteId:', cliente.clienteId);
    navigate(`/listar/${cliente.clienteId}`);
  }}
>
  <i className='bx bxs-dog'></i>
</button>

      </td>
    </tr>
  ))}
</tbody>



    </table>

    {selectedCliente && (
        <ModalUpdateCliente
          cliente={selectedCliente}
          closeModal={() => setSelectedCliente(null)}
          fetchClientes={fetchClientes}
        />
      )}
    </>
  );
};

export default Cliente;
