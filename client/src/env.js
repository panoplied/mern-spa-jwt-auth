const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;
const API_PATH = process.env.REACT_APP_API_PATH;

const API_BASE_URL = `${API_HOST}:${API_PORT}/${API_PATH}`;

export default API_BASE_URL;