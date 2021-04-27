import React from 'react';
import NuevaSolicitud from './NuevaSolicitud';

import SolicitudProvider from '../../Context/SolcitudContext';


export const Nuevo = () => {
    

    return ( 
        <SolicitudProvider> 
            <NuevaSolicitud />
        </SolicitudProvider>
     );
}
 