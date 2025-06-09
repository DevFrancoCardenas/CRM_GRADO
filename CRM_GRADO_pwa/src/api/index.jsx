import Swal from 'sweetalert2';
import axios from 'axios';

const api_uri = import.meta.env.VITE_NODE_ENV == "production" ?
  import.meta.env.VITE_GRAPHQL_URI_PRODUCTION :
  import.meta.env.VITE_GRAPHQL_URI;

const client = axios.create({
  baseURL: api_uri, // Reemplaza con tu URL base
  timeout: 90000, // Establece el tiempo de espera en milisegundos (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


const cleanEmptyStrings = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      cleanEmptyStrings(obj[key]); // Llamada recursiva para objetos anidados
    } else if (obj[key] === '') {
      delete obj[key]; // Elimina campos con cadenas vacías
    }
  });
};
// Add an interceptor to handle requests
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('heaven');
    if (token) config.headers['Authorization'] = token;

    // Verificar y limpiar el cuerpo de la solicitud
    if (config.data && config.headers['Content-Type'] === 'application/json') {
      let data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;

      // Llamada a la función de limpieza
      cleanEmptyStrings(data);

      // Reconvierte a JSON si era originalmente una cadena
      config.data = (typeof config.data === 'string') ? JSON.stringify(data) : data;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // Manejar la respuesta exitosa
    return response;
  },
  (error) => {
    // Verificar si el error es un error de tiempo de espera
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      // Mostrar mensaje de error de tiempo de espera
      Swal.fire({
        title: 'Problema de Conexión',
        text: 'No hay conexión a Internet o la conexión está muy lenta. Por favor, inténtalo de nuevo más tarde.',
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'Entendido'
      });
    } else if (import.meta.env.VITE_NODE_ENV !== 'production') {
      // Si estás en un entorno de desarrollo, imprime el error en la consola
      console.log(error);
      console.error('Error Axios:', error.config.url, error.response);
    }
    // Continuar con el rechazo del error para manejo adicional si es necesario
    return Promise.reject(error);
  }
);

export default client;