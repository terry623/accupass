import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getCategories, getAttractions } from '../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AttractionInfo = () => {
  const [info, setInfo] = useState({});
  let { id } = useParams();
  const queryCategory = useQuery().get('category');
  id = parseInt(id, 10);

  const search = async targetCategory => {
    const attractions = await getAttractions(targetCategory);
    const result = attractions.find(e => e.id === id);
    return result;
  };

  // 實務上若遇到此情況，會與後端溝通 API => 使用單一 id 查景點資訊
  useEffect(() => {
    async function fetchCategory() {
      if (queryCategory) {
        const result = await search(queryCategory);
        if (result) {
          setInfo(result);
          return;
        }
      }

      // 類別若為錯誤，或者無提供，都會重頭開始搜尋
      console.log('Searching...');
      const categories = await getCategories();
      for (const c of categories) {
        const result = await search(c.id);
        if (result) {
          setInfo(result);
          return;
        }
      }
    }

    fetchCategory();
  }, []);

  return (
    <div className="AttractionInfo">
      {Object.keys(info).length === 0 ? (
        <div className="loading">
          <h2>Loading ......</h2>
        </div>
      ) : (
        <div>{info.name}</div>
      )}
    </div>
  );
};

export default AttractionInfo;
