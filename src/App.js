import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './components/layout/Layout';
import Movimiento from './components/Movimiento';
import Login from './components/Login/Login';
import Nuevo from './components/Movimiento/Nuevo/index';
import Atender from './components/Movimiento/Atender/index';
import Solicitud from './components/Solicitud';
import { Nuevo as NSolicicitud }   from './components/Solicitud/Nuevo/index';
import Settings from './components/Settings/index';
import { Atender as AtenderSol } from './components/Solicitud/Atender/index';
import Facturas from './components/Facturas/index';
import { Atender as AtenderFac } from './components/Facturas/Atender/index'


function App() {
  return (
    
    <Router>
        <Layout>
          <Switch>
              <Route path="/facturas/atender/:id" component={AtenderFac} /> 
              <Route path="/facturas" component={Facturas} /> 
              <Route path="/solicitudes/atender/:id" component={AtenderSol} />  
              <Route path="/solicitudes/nuevo" component={NSolicicitud} />  
              <Route path="/solicitudes" component={Solicitud} />
              <Route path="/movimientos/nuevo" component={Nuevo} />  
              <Route path="/movimientos/atender/:id" component={Atender} />  
              <Route path="/movimientos" component={Movimiento} />
              <Route path="/settings" component={Settings} />
              <Route path="/" exact component={Login} />
          </Switch>
        </Layout>
        
    </Router>
    
      
  );
}

export default App;
