import React from 'react';
import SolicitudProvider from '../Context/SolcitudContext';
import Home from './Home';

const Solicitud = () => {
    return ( 
        <SolicitudProvider>
            <Home/>
        </SolicitudProvider>
     );
}
 
export default Solicitud;

