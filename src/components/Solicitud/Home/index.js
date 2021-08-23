import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Grid, Paper, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableContainer from '@material-ui/core/TableContainer';
import CreateIcon from '@material-ui/icons/Create';
import CustomTextBox from './../../Common/CustomTextBox';
import TableHome from './TableHome';
import { SolicitudContext } from '../../Context/SolicitudContext';
import TblSearchHome from './TblSearchHome';

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
  const history = useHistory();
  const { setSolicitudes } = useContext(SolicitudContext);
  const [drawerState, setdrawerState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const toggleDrawer = () => {
    setdrawerState(!drawerState);
  };

  const handleAddTicket = () => {
    history.push('/solicitudes/nuevo');
  };

  const handleFilterClick = () => {};

  const handleTake = () => {};

  const selectedTake = (row) => {
    history.push(`/solicitudes/atender/${row._id}`);
  };

  const handleFiltertextChange = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/facturas/solicitudes`
      );
      setSolicitudes(response.data);
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.paperTitle}>
              <h2>Solicitudes de Facturación</h2>
            </div>
          </Grid>

          <Grid item xs>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CreateIcon />}
              onClick={handleAddTicket}
            >
              Nuevo
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <TblSearchHome
                data={data}
                selectedTake={(row) => selectedTake(row)}
              />
            </TableContainer>
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={drawerState}
          onClose={toggleDrawer}
        ></Drawer>
      </Container>
    </React.Fragment>
  );
};

export default Home;
