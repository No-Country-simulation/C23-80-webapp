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

export const fetchResourcesByHandle = async (handle) => {
  try {
    const response = await axios.get(`${API_URL}/categorias/${handle}`);
    const skills = response.data.skills || [];
    return skills;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchLastResources = async () => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};