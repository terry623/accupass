import axios from 'axios';

const baseUrl = 'https://accupass-backend.now.sh';

export const getCategories = async () => {
  let response = null;
  try {
    response = await axios.get(`${baseUrl}/categories`);
  } catch (error) {
    console.error(error);
  }
  return response;
};

export const getAttractions = async ({ categoryIds, page }) => {
  let response = null;
  try {
    response = await axios.get(`${baseUrl}/categories/${categoryIds}/${page}`);
  } catch (error) {
    console.error(error);
  }
  return response;
};
