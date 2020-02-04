import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import AttractionInfo from './components/AttractionInfo';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:id">
        <AttractionInfo />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
