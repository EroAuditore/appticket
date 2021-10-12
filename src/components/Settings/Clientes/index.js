import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';

const Clientes = () => {
  const [agentes, setAgentes] = useState([]);

  useState(() => {
    const getFacturas = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/listado/agente`
      );
      setAgentes([...response.data]);
    };
    getFacturas();
  }, []);
  return <h1>Clientes index</h1>;
};

export default Clientes;
