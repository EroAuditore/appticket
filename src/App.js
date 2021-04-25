import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Movimiento from './components/Movimiento';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.css';
import NuevoMovimiento from './components/Movimiento/Nuevo/index';


function App() {
  return (
    <Router>
        <Layout>
          <Switch>
              <Route path="/movimientos/nuevo" component={NuevoMovimiento} />  
              <Route path="/movimientos" component={Movimiento} />
              <Route path="/" exact component={Login} />
          </Switch>
        </Layout>
    </Router>
      
  );
}

export default App;
