import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Grid, Paper, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableContainer from '@material-ui/core/TableContainer';
import AlertTomar from './AlertTomar';
import FilterForm from './FilterForm';

import CustomTextBox from './../../Common/CustomTextBox';
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

  const [drawerState, setdrawerState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedTake, setSelectedTake] = useState({});
  const [facturas, setFacturas] = useState([]);
  const history = useHistory();

  const toggleDrawer = () => {
    setdrawerState(!drawerState);
  };

  const handleTake = () => {
    history.push('/facturas/atender/' + selectedTake._id);
    //dispatch(startGenFactura(selectedTake));
    //dispatch(startGetMovimientoP(selectedTake));
  };

  const toggleTake = (row) => {
    setSelectedTake({ ...selectedTake, ...row });
    setAlertState(!alertState);
  };

  /*const handleAddTicket = () => {
    history.push("/tickets/nuevo");
  };*/

  const handleFilterClick = () => {
    const findObj = { filterText: filterText };
    /*dispatch(startFilterMovimiento(findObj));*/
  };

  const handleFiltertextChange = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    const getFacturas = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API + `/facturas/movimientos`
      );
      console.log(response.data);
      setFacturas([...response.data]);
    };
    getFacturas();

    //setSelectedTake({ ...selectedTake, currentUserId: getCurrentUserID() });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.paperTitle}>
              <h2>Facturación</h2>
            </div>
          </Grid>
          {/* <Grid item xs>
            <CustomTextBox
              onClick={handleFilterClick}
              onChange={handleFiltertextChange}
            />
          </Grid> */}
          <Grid item xs></Grid>
          {/* <Grid item xs>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={toggleDrawer}
              startIcon={<FilterListIcon />}
            >
              Filtros
            </Button> 
          </Grid>*/}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <TblSearchHome
                data={facturas}
                toggleTake={(row) => toggleTake(row)}
              />
            </TableContainer>
          </Grid>
        </Grid>
        <Drawer anchor="right" open={drawerState} onClose={toggleDrawer}>
          <FilterForm toggleDrawer={toggleDrawer} />
        </Drawer>
        <AlertTomar
          alertState={alertState}
          handleClose={toggleTake}
          handleTake={handleTake}
        />
      </Container>
    </React.Fragment>
  );
};

export default Home;
