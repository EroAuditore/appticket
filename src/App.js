import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Movimiento from './components/Movimiento';

function App() {
  return (
    <Router>
        <Layout>
          <Switch>
              <Route path="/movimiento" component={Movimiento} />
          </Switch>
        </Layout>
    </Router>
      
  );
}

export default App;
