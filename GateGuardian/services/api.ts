import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'http://10.10.24.20:3000/gg',
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ejemplo de función para registrar un usuario
export const registerUser = async (email: string, password: string) => {
  try {
    console.log('Conectando a la API para registrar usuario...');
    const response = await api.post('/users/createAccount', { email, password });
    console.log('Conexión exitosa. Usuario registrado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al conectar a la API para registrar usuario:', error);
    throw new Error(error.response?.data?.message || 'Error al registrar el usuario');
  }
};

// Ejemplo de función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Conectando a la API para iniciar sesión...');
    const response = await api.post('/users/login', { email, password });
    console.log('Conexión exitosa. Sesión iniciada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al conectar a la API para iniciar sesión:', error);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

// Ejemplo de función para obtener registros de aperturas
export const getAccessLogs = async () => {
  try {
    console.log('Conectando a la API para obtener registros de aperturas...');
    const response = await api.get('/doors/getLogs');
    console.log('Conexión exitosa. Registros obtenidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al conectar a la API para obtener registros de aperturas:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener los registros de aperturas');
  }
};

// Ejemplo de función para crear una clave temporal
export const createTemporaryKey = async (user: string, duration: number) => {
  try {
    console.log('Conectando a la API para crear clave temporal...');
    const response = await api.post('/temporary-key', { user, duration });
    console.log('Conexión exitosa. Clave temporal creada:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al conectar a la API para crear clave temporal:', error);
    throw new Error(error.response?.data?.message || 'Error al crear la clave temporal');
  }
};

export default api;
