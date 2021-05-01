import React from 'react';
import AtenderSolicitud from './AtenderSolicitud';

import SolicitudProvider from '../../Context/SolicitudContext';


export const Atender = () => {
    

    return ( 
        <SolicitudProvider> 
            <AtenderSolicitud />
        </SolicitudProvider>
     );
}
 