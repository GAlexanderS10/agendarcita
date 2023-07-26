import React, { useState } from 'react';
import axios from 'axios'; // Import axios library
import '../Components/Styles/Modal.css';

const Modal = ({ fetchClientes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    TipoDocumento: '',
    NroIdentidad: '',
    Celular: '',
    Email: '',
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:7051/api/Cliente', formData)
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
      <button className="btn-modal" onClick={openModal}>Abrir Modal</button>
      <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="contenedor-registro-cliente">
            <div className="tiulo-registro-cliente">Registro de Cliente</div>
            <form className="formulario-cliente" onSubmit={handleSubmit}>
              <div className="detalles-clientes">
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
                <input type="submit" value="REGISTRAR" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
