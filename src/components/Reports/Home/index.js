import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MovimientosPFacturar from '../Movimientos/MovimientosPFacturar';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paperTitle: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  drawerContent: {
    width: 450,
    padding: 25,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const getMovimientos = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/movimientos/pendientes/facturar/all`
      );
      setMovimientos(response.data);
    };
    getMovimientos();
  }, []);
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.paperTitle}>
              <h2>Movimientos pendientes</h2>
            </div>
          </Grid>
          <Grid item xs={12}>
            <MovimientosPFacturar data={movimientos} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
