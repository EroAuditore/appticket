
import React, {createContext,  useState} from 'react';
//create context for app
export const FacturasContext =  createContext();

const FacturasProvider  =({children}) =>{
   
    const [facturas, setFacturas] = useState([]);

    return (
        <FacturasContext.Provider
            value={{
                
                facturas,
                setFacturas,
            }}
        >
            {children}
        </FacturasContext.Provider>
    );

}

export default FacturasProvider;