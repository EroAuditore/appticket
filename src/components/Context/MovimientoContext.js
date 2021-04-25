import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

//create context for app
export const MovimientoContext =  createContext();


const MovimientoProvider = ({children}) => {
    const [movimientos, setMovimientos] = useState([]);

    useEffect(()=>{
        const getMovimientos = async () => {
            const response = await axios.post(process.env.REACT_APP_API + `/tickets`);
            setMovimientos(response.data);
        }
        getMovimientos();
    }, [])
    return ( 
        <MovimientoContext.Provider
            value = {{
                movimientos,
            }}
        >
            {children}

        </MovimientoContext.Provider> 
    );
}
 
export default MovimientoProvider;