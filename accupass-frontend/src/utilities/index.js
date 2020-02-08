import { getAttractions } from '../api';

export const searchAttractionByCategory = async (
  attractionId,
  targetCategory
) => {
  for (let page = 1; ; page = page + 1) {
    const attractions = await getAttractions(targetCategory, page);
    if (attractions.length === 0) return;
    const result = attractions.find(e => e.id === attractionId);
    if (result) return result;
  }
};
