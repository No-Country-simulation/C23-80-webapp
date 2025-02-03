import axios from 'axios';

const API_URL = '/api';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};