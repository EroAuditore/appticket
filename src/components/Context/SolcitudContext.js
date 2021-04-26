
import React, {createContext,  useState} from 'react';
//create context for app
export const SolicitudContext =  createContext();

const SolicitudProvider  =({children}) =>{
    const [solicitudes, setSolicitudes] = useState([]);

    return (
        <SolicitudContext.Provider
            value={{
                solicitudes,
                setSolicitudes
            }}
        >
            {children}
        </SolicitudContext.Provider>
    );

}

export default SolicitudProvider;