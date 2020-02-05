import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getCategories = async () => {
  let response = null;
  try {
    response = await axios.get(`${baseUrl}/categories`);
  } catch (error) {
    console.error(error);
  }
  return response.data.data.Category;
};

export const getAttractions = async id => {
  let response = null;
  try {
    response = await axios.get(`${baseUrl}/categories/${id}/1`);
  } catch (error) {
    console.error(error);
  }
  return response.data.data;
};
