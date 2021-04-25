
import React, {createContext,  useState} from 'react';
//create context for app
export const MovimientoContext =  createContext();

const MovimientoProvider = ({children}) => {
    const [movimientos, setMovimientos] = useState([]);
    const [agentesList, setAgentesList] = useState([]);
    const [clientesList, setClientesList] = useState([]);
    const [depositos, setDepositos] = useState([]);
    const [retornos, setRetornos] = useState([]);
    const [comisiones, setComisiones] = useState([]);
    
    return ( 
        <MovimientoContext.Provider
            value = {{
                movimientos,
                setMovimientos,
                agentesList,
                setAgentesList,
                clientesList,
                setClientesList,
                depositos,
                setDepositos,
                retornos,
                setRetornos,
                comisiones,
                setComisiones
            }}
        >
            {children}

        </MovimientoContext.Provider> 
    );
}
 
export default MovimientoProvider;