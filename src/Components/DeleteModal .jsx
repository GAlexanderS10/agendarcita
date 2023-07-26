import React, { useState } from 'react';
import axios from 'axios';
import './Styles/Eliminar.css'; // Importa el archivo CSS con los estilos del modal

const DeleteModal = ({ clienteId, fetchClientes }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`https://localhost:7051/api/Cliente/${clienteId}`)
      .then((response) => {
        console.log(response.data); // Handle the response here if needed
        closeModal();
        fetchClientes(); // Llama a la función para actualizar los clientes en el componente Cliente
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button className="btn-eliminar-cliente" onClick={openModal}>
        <i className='bx bx-message-alt-x'></i>
      </button>
      <div className={`mdl ${modalOpen ? 'mdl-open' : ''}`}>
        <div className="mdl-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="contenedor-mensaje">
            <div className="mensaje-eliminar">¿Desea eliminar este registro?</div>
            <div className="btn-container">
              <button className="btn-confirmar-eliminar" onClick={handleDelete}>Confirmar</button>
              <button className="btn-cancelar-eliminar" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
