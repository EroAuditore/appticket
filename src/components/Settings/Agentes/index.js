import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Container } from '@material-ui/core';
import axios from 'axios';
import Table from './Table';
import AgenteModal from './AgenteModal';
import SnackAlert from './../../Common/SnackAlert';

const Agentes = () => {
  const [agentes, setAgentes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [modalState, setModalState] = useState(false);
  const [SnackState, setSnackState] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [msgSnack, setmsgSnack] = useState('Guardado exitoso');

  useState(() => {
    const getFacturas = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/listado/agente`
      );
      setAgentes([...response.data]);
    };
    getFacturas();
  }, []);

  const handleNew = () => {
    setModalState(true);
  };

  const handleClose = () => {
    setModalState(false);
  };

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleGuardar = () => {
    const guardaAgente = async () => {
      await axios
        .post(process.env.REACT_APP_API + `/agente/nuevo`, {
          Agente: nombre,
        })
        .then((resp) => {
          setSnackState(true);
          setModalState(false);
          setNombre('');
          setAgentes(resp.data);
        })
        .catch((err) => {
          setmsgSnack('Vuelva intentar guardar');
          setSeverity('error');
          setSnackState(true);
        });
    };

    guardaAgente();
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
            <h2>Agentes</h2>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="default" onClick={handleNew}>
              Nuevo
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={agentes} />
          </Grid>
        </Grid>
      </Container>

      <AgenteModal
        status={modalState}
        handleClose={handleClose}
        nombre={nombre}
        handleChange={handleChange}
        handleGuardar={handleGuardar}
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

export default Agentes;
