import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { getCategories, getAttractions } from '../api';
import noImage from '../assets/noImage.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AttractionInfo = () => {
  const [info, setInfo] = useState({});

  let { id } = useParams();
  const history = useHistory();
  const queryCategory = useQuery().get('category');
  id = parseInt(id, 10);

  const searchAttractionByCategory = async targetCategory => {
    const attractions = await getAttractions(targetCategory);
    const result = attractions.find(e => e.id === id);
    return result;
  };

  // 實務上若遇到此情況，會與後端溝通 API => 使用單一 id 查景點資訊
  useEffect(() => {
    async function fetchAttraction() {
      if (queryCategory) {
        const result = await searchAttractionByCategory(queryCategory);
        if (result) {
          setInfo(result);
          return;
        }
      }

      // 類別若為錯誤，或者無提供，都會重頭開始搜尋
      console.log('Searching...');
      const categories = await getCategories();
      for (const c of categories) {
        const result = await searchAttractionByCategory(c.id);
        if (result) {
          setInfo(result);
          return;
        }
      }

      // 都沒有則返回首頁
      history.push('/');
    }

    fetchAttraction();
  }, []);

  return (
    <div className="AttractionInfo">
      {Object.keys(info).length === 0 ? (
        <div className="loading">
          <h2>Loading ......</h2>
        </div>
      ) : (
        <div>
          {info.images[0] ? (
            <img src={info.images[0].src} alt="" />
          ) : (
            <img src={noImage} alt="" />
          )}
          <h3>{info.name}</h3>
          <p>{info.address}</p>
          <br />
          <div>介紹</div>
          <div>{info.introduction}</div>
          <br />
          <div>聯絡資訊</div>
          <div>{info.tel}</div>
          <div>{info.email}</div>
          <div>{info.offical_site}</div>
          <br />
          <div>類別</div>
          <div>
            {info.category.map(e => (
              <div key={e.id}>{e.name}</div>
            ))}
          </div>
          <br />
          <div>查看更多</div>
          <div>{info.url}</div>
        </div>
      )}
    </div>
  );
};

export default AttractionInfo;
