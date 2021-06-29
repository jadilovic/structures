// src/components/App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import history from './service/history';
import { HeaderDrawer } from './views';
import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';

function App() {
  return (
    <Router history={history}>
      <Snackbar />
      <HeaderDrawer />
      <Switch>
        <PrivateRoute path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
