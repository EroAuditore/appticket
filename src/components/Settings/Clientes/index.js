import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Container } from '@material-ui/core';
import axios from 'axios';
import Table from './Table';
import ClienteModal from './ClienteModal';
import SnackAlert from './../../Common/SnackAlert';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [agente, setAgente] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cliente, setCliente] = useState({
    nombre: '',
    RFC: '',
    direccion: '',
    email: '',
    idAgente: 0,
  });
  const [modalState, setModalState] = useState(false);
  const [SnackState, setSnackState] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [msgSnack, setmsgSnack] = useState('Guardado exitoso');

  useState(() => {
    const fetchAgentes = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/listado/agente`
      );
      setAgentes([...response.data]);
    };

    const fetchClientes = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/clientes/todos`
      );
      setClientes([...response.data]);
    };
    fetchAgentes();
    fetchClientes();
  }, []);

  const OnAgenteChange = (e) => {
    setAgente(e.target.value);
    setCliente({ ...cliente, idAgente: e.target.value });
  };
  const handleNew = () => {
    setModalState(true);
  };

  const handleClose = () => {
    setModalState(false);
  };

  const handleChange = (e) => {
    //setNombre(e.target.value);
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    const guardaCliente = async () => {
      await axios
        .post(process.env.REACT_APP_API + `/cliente/nuevo`, cliente)
        .then((resp) => {
          setSnackState(true);
          setModalState(false);
          setCliente({
            nombre: '',
            RFC: '',
            direccion: '',
            email: '',
            idAgente: 0,
          });

          setClientes(resp.data);
        })
        .catch((err) => {
          setmsgSnack('Vuelva intentar guardar');
          setSeverity('error');
          setSnackState(true);
        });
    };
    console.log(cliente);
    guardaCliente();
  };

  const closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackState(false);
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Clientes</h2>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default" onClick={handleNew}>
              Nuevo
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={clientes} />
          </Grid>
        </Grid>
      </Container>

      <ClienteModal
        status={modalState}
        handleClose={handleClose}
        cliente={cliente}
        handleChange={handleChange}
        handleGuardar={handleGuardar}
        agentesList={agentes}
        agente={agente}
        OnAgenteChange={OnAgenteChange}
      />
      <SnackAlert
        open={SnackState}
        handleClose={closeSnack}
        severity={severity}
        message={msgSnack}
      />
    </>
  );
};

export default Clientes;
