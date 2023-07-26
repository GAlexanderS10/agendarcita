import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Modal.css';

const Editar = ({ mascota, closeModal, clienteId, fetchMascotasPorIdCliente, onEdit }) => {
  const [formData, setFormData] = useState({
    nombre: mascota.nombre,
    tipoMascota: mascota.tipoMascota,
    raza: mascota.raza,
    sexo: mascota.sexo,
    color: mascota.color,
    fechaNacimiento: mascota.fechaNacimiento.split('T')[0], // Formatea la fecha para el input date
    foto: null, // Aquí también debemos inicializar la foto con el valor de la mascota
    clienteId: mascota.clienteId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, Foto: file });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithFile = new FormData();
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    axios.put(`https://localhost:7051/api/Mascota/${mascota.mascotaId}`, formDataWithFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        closeModal();
        onEdit(mascota.mascotaId, formData); // Llama a la función onEdit con el ID de la mascota editada y los datos editados
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
          <div className="tiulo-registro-cliente">Actualizar Datos de la Mascota</div>
          <form className="formulario-cliente" onSubmit={handleSubmit}>
            <div className="detalles-clientes">
              <div className="input-box-cliente">
                <span className="nombres-inputs">Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresar Nombre"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Tipo de Mascota</span>
                <input
                  type="text"
                  name="tipoMascota"
                  value={formData.tipoMascota}
                  onChange={handleInputChange}
                  placeholder="Ingresar Tipo de Mascota"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Raza</span>
                <input
                  type="text"
                  name="raza"
                  value={formData.raza}
                  onChange={handleInputChange}
                  placeholder="Ingresar Raza"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Sexo</span>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Seleccionar opción</option>
                  <option value="MACHO">Macho</option>
                  <option value="HEMBRA">Hembra</option>
                </select>
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Color</span>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Ingresar Color"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Fecha de Nacimiento</span>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Foto</span>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">ID del Cliente</span>
                <input
                  type="number"
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleInputChange}
                  placeholder="Ingresar ID del Cliente"
                  readOnly // Hacemos el campo de solo lectura
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

export default Editar;
