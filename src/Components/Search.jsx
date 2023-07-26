import React, { useState } from 'react';
import axios from 'axios';
import './Styles/Search.css'; // Agrega los estilos del componente Search

const Search = ({ setClientes }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
  
    const handleSearch = () => {
      if (!searchTerm) {
        // Si el campo de búsqueda está vacío, restaura la tabla completa
        fetchClientes();
        setError('');
        return;
      }
  
      axios.get(`https://localhost:7051/api/Cliente/${searchTerm}`)
        .then((response) => {
          if (response.data) {
            // Si se encuentra un cliente con el ID buscado, actualiza la tabla
            setClientes([response.data]);
            setError('');
          } else {
            // Si no se encuentra ningún cliente con el ID buscado, muestra un mensaje de error
            setClientes([]);
            setError('No se encontró ningún cliente con el ID proporcionado.');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Hubo un error al realizar la búsqueda.');
        });
    };
  
    const fetchClientes = () => {
      axios.get('https://localhost:7051/api/Cliente')
        .then(response => {
          setClientes(response.data);
          setError('');
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
          setError('Hubo un error al obtener los datos.');
        });
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ingrese el ID del cliente"
        />
        <button className="btn-buscar" onClick={handleSearch}>Buscar</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };
  
  export default Search;