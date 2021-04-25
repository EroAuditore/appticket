import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

//create context for app
export const MovimientoContext =  createContext();


const MovimientoProvider = ({children}) => {
    const [movimientos, setMovimientos] = useState([]);
    const [agentesList, setAgentesList] = useState([]);
    const [clientesList, setClientesList] = useState([]);
    
    return ( 
        <MovimientoContext.Provider
            value = {{
                movimientos,
                setMovimientos,
                agentesList,
                setAgentesList,
                clientesList,
                setClientesList
            }}
        >
            {children}

        </MovimientoContext.Provider> 
    );
}
 
export default MovimientoProvider;