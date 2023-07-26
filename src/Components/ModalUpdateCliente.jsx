import React, { useState } from 'react';
import axios from 'axios';
import './Styles/Modal.css';

const ModalUpdateCliente = ({ cliente, closeModal, fetchClientes }) => {
  const [formData, setFormData] = useState({
    clienteId: cliente.clienteId,
    Nombres: cliente.nombres,
    Apellidos: cliente.apellidos,
    TipoDocumento: cliente.tipoDocumento,
    NroIdentidad: cliente.nroIdentidad,
    Celular: cliente.celular,
    Email: cliente.email,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://localhost:7051/api/Cliente/${cliente.clienteId}`, formData)
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
    <div className="modal modal-open">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="contenedor-registro-cliente">
          <div className="tiulo-registro-cliente">Actualizar Datos del Cliente</div>
          <form className="formulario-cliente" onSubmit={handleSubmit}>
            <div className="detalles-clientes">
              <div className="input-box-cliente">
                <span className="nombres-inputs">ID</span>
                <input
                  type="text"
                  name="clienteId"
                  value={cliente.clienteId}
                  onChange={handleInputChange}
                  placeholder="ID"
                  required
                  disabled
                />
              </div>
              <div className="input-box-cliente">
                  <span className="nombres-inputs">Nombres</span>
                  <input
                    type="text"
                    name="Nombres"
                    value={formData.Nombres}
                    onChange={handleInputChange}
                    placeholder="Ingresar Nombres"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Apellidos</span>
                  <input
                    type="text"
                    name="Apellidos"
                    value={formData.Apellidos}
                    onChange={handleInputChange}
                    placeholder="Ingresar Apellidos"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Documento de Identidad</span>
                  <select
                    name="TipoDocumento"
                    value={formData.TipoDocumento}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Seleccionar opción</option>
                    <option value="DNI">DNI</option>
                    <option value="PASAPORTE">Pasaporte</option>
                    <option value="CARNET DE EXTRANJERIA">Carnet de Extranjería</option>
                  </select>
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Número de Identidad</span>
                  <input
                    type="text"
                    name="NroIdentidad"
                    value={formData.NroIdentidad}
                    onChange={handleInputChange}
                    placeholder="Ingresar Número de Identidad"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Celular</span>
                  <input
                    type="text"
                    name="Celular"
                    value={formData.Celular}
                    onChange={handleInputChange}
                    placeholder="Ingresar Celular"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Email</span>
                  <input
                    type="text"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    placeholder="Ingresar Email"
                    required
                  />
                </div>
              </div>
              <div className="btn-cli-add">
                <input type="submit" value="EDITAR" />
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateCliente;
