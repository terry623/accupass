const axios = require('axios');

const baseURL = 'https://www.travel.taipei/open-api/zh-tw';

const getCategories = async () => {
  let response = {};
  try {
    response = await axios.get(
      `${baseURL}/Miscellaneous/Categories?type=Attractions`
    );
  } catch (error) {
    console.error(error);
  }
  return response;
};

const getAttractions = async ({ categoryIds, page }) => {
  let response = {};
  try {
    response = await axios.get(
      `${baseURL}/Attractions/All?categoryIds=${categoryIds}&page=${page}`
    );
  } catch (error) {
    console.error(error);
  }
  return response;
};

module.exports = {
  getCategories,
  getAttractions,
};
