import React from 'react';
import AtenderFactura from './AtenderFactura';
import FacturasProvider from '../../Context/SolicitudContext';


export const Atender = () => {
    

    return ( 
        <FacturasProvider> 
            <AtenderFactura />
        </FacturasProvider>
     );
}