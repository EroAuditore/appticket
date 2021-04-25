import React from 'react';
import NuevoMovimiento from './NuevoMovimiento';
import MovimientoProvider from '../../Context/MovimientoContext';


const Nuevo = () => {
    

    return ( 
        <MovimientoProvider> 
            <NuevoMovimiento/>
        </MovimientoProvider>
     );
}
 
export default Nuevo;