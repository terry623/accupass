import React, { useEffect } from 'react';
import './App.scss';

import { getCategories, getAttractions } from './api';

import Home from './components/Home';

const App = () => {
  useEffect(() => {
    async function fetchData() {
      const {
        data: {
          data: { Category },
        },
      } = await getCategories();

      const {
        data: { data },
      } = await getAttractions({ categoryIds: 12, page: 1 });

      console.log({ Category, data });
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
