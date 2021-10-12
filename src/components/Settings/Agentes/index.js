import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';

const Agentes = () => {
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

  return (
    <>
      <h2>Agentes</h2>
      <Table data={agentes} />
    </>
  );
};

export default Agentes;
