
import React, {createContext,  useState} from 'react';
//create context for app
export const SolicitudContext =  createContext();

const SolicitudProvider  =({children}) =>{
    const [solicitudes, setSolicitudes] = useState([]);
    const [agentesList, setAgentesList] = useState([]);
    const [clientesList, setClientesList] = useState([]);
    const [facturas, setFacturas] = useState([]);

    return (
        <SolicitudContext.Provider
            value={{
                solicitudes,
                setSolicitudes,
                agentesList,
                setAgentesList,
                clientesList,
                setClientesList,
                facturas,
                setFacturas,
            }}
        >
            {children}
        </SolicitudContext.Provider>
    );

}

export default SolicitudProvider;