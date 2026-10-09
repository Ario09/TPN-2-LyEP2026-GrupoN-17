import axios from "axios";

// La URL del backend se define en client/.env (VITE_API_URL).
// Si no existe, se usa el servidor local del equipo.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
const URL = `${API_URL}/clientes`;

const obtenerClientes = async () => {
    const respuesta = await axios.get(URL);
    return respuesta.data;
};

const obtenerClientePorId = async (id) => {
    const respuesta = await axios.get(`${URL}/${id}`);
    return respuesta.data;
};

const crearCliente = async (cliente) => {
    const respuesta = await axios.post(URL, cliente);
    return respuesta.data;
};

const eliminarCliente = async (id) => {
    const respuesta = await axios.delete(`${URL}/${id}`);
    return respuesta.data;
};

export default {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    eliminarCliente
};
