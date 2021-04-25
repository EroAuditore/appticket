import React, { useEffect, useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Container, Grid, Paper, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import TableContainer from "@material-ui/core/TableContainer";
import CreateIcon from "@material-ui/icons/Create";
import CustomTextBox from './../../Common/CustomTextBox';
import TableHome from './TableHome';
import { MovimientoContext } from "../../Context/MovimientoContext";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paperTitle: {
    padding: theme.spacing(1),
    textAlign: "left",
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
  const {setMovimientos} = useContext(MovimientoContext);
  const [drawerState, setdrawerState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const toggleDrawer = () => {
    setdrawerState(!drawerState);
  };

  const handleAddTicket = () => {
    history.push("/movimientos/nuevo");
  };

  const handleFilterClick = () => {
   
  };

  const handleTake = () => {
    
  };

  const toggleTake = (row) => {
   
  };

  const handleFiltertextChange = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(()=>{
    const getMovimientos = async () => {
      const response = await axios.post(process.env.REACT_APP_API + `/tickets`);
      setMovimientos(response.data);
      console.log("getMovimientos");
    }
    getMovimientos();
  },[]);
 

    return ( 
    <React.Fragment>
    <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.paperTitle}>
              <h2>Movimientos</h2>
            </div>
          </Grid>
          <Grid item xs>
            <CustomTextBox
              onClick={handleFilterClick}
              onChange={handleFiltertextChange}
            />
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
          <Grid item xs>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={toggleDrawer}
              startIcon={<FilterListIcon />}
            >
              Filtros
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
                <TableHome data={data} toggleTake={(row) => toggleTake(row)} />
            </TableContainer>
          </Grid>
        </Grid>
        <Drawer anchor="right" open={drawerState} onClose={toggleDrawer}>
         
        </Drawer>
       
      </Container>
   
        </React.Fragment>
     );
}
 
export default Home;