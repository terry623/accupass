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

export const getAttractions = async (categoryId, page = 1) => {
  let response = null;
  try {
    response = await axios.get(`${baseUrl}/categories/${categoryId}/${page}`);
  } catch (error) {
    console.error(error);
  }
  return response.data.data;
};
