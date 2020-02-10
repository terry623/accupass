import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';

import { getCategories } from '../api';
import { searchAttractionByCategory } from '../utilities';

import './AttractionInfo.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AttractionInfo = () => {
  const [info, setInfo] = useState({});

  const attractionId = parseInt(useParams().id, 10);
  const queryCategoryId = useQuery().get('category');
  const history = useHistory();

  // 實務上若遇到此情況，會與後端溝通 API => 使用單一 id 查景點資訊
  useEffect(() => {
    async function fetchAttraction() {
      if (queryCategoryId) {
        const result = await searchAttractionByCategory(
          attractionId,
          queryCategoryId
        );
        if (result) {
          setInfo(result);
          return;
        }
      }

      // 類別若為錯誤，或者無提供，都會重頭開始搜尋
      console.log('Searching Attraction...');
      const categories = await getCategories();
      for (const category of categories) {
        const result = await searchAttractionByCategory(
          attractionId,
          category.id
        );
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

  useEffect(() => {
    if (info.name) document.title = info.name;
  }, [info]);

  return (
    <div className="AttractionInfo">
      {Object.keys(info).length === 0 ? (
        <div className="loading">
          <h2>Loading ......</h2>
        </div>
      ) : (
        <div className="main">
          <Paper elevation={3}>
            {info.images[0] && <img src={info.images[0].src} alt="" />}
            <div className="info">
              <div>
                <h3>{info.name}</h3>
                <p>{info.address}</p>
              </div>
              <div className="infoArea">
                <h4>介紹</h4>
                <p>{info.introduction}</p>
              </div>
              <div className="infoArea">
                <h4>聯絡資訊</h4>
                <p>電話 : {info.tel || '無'}</p>
                <p>電子郵件 : {info.email || '無'} </p>
                <p>官方網站 : {info.offical_site || '無'}</p>
              </div>
              <div className="infoArea">
                <h4>類別</h4>
                {info.category.map(e => (
                  <Chip
                    key={e.id}
                    label={e.name}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </div>
              <div className="infoArea">
                <h4>查看更多</h4>
                <p>
                  <Link href={info.url} color="inherit" target="_blank">
                    {info.url}
                  </Link>
                </p>
              </div>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default AttractionInfo;
