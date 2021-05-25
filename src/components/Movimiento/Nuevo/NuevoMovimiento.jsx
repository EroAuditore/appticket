import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,

  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import CountUp from "react-countup";
import { v4 as uuidv4 } from "uuid";
import MovimientoForm from "./MovimientoForm";
import TabPanel from "../../Common/TabPanel";
import { MovimientoContext } from './../../Context/MovimientoContext';
import DepositosTab from "../Common/Depositos/DepositosTab";
import ModalForm from "../../Common/ModalForm";
import DepositoForm from '../Common/Depositos/DepositoForm';
import RetornoForm from './../Common/Retornos/RetornoForm';
import ComisionForm from '../Common/Comisiones/ComisionForm';
import AlertForm from './../../Common/AlertForm';
import FacturaTable from '../Common/Facturas/FacturaTable';
import RetornosTab from './../Common/Retornos/RetornosTab';
import ComisionTab from './../Common/Comisiones/ComisionTab';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  paperTitle: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paperModal: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },

  drawerContent: {
    width: 450,
    padding: 25,
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  }
}));

const NuevoMovimiento = () => {
  const classes = useStyles();
  const {setAgentesList, 
        setClientesList, 
        depositos, 
        setDepositos,
        retornos,
        setRetornos,
        comisiones,
        setComisiones 
      } = useContext(MovimientoContext);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [ModalState, setModalState] = useState(false);
  const [ModalStateFacturas, setModalStateFacturas] = useState(false);
  const [totalMovimiento, setTotalMovimiento] = useState(0);
  const [totalDepositos, setTotalDepositos] = useState(0);
  const [totalRetornos, setTotalRetornos] = useState(0);
  const [totalComisiones, setTotalComisiones] = useState(0);
  const [startCounter, setStartCounter] = useState(0);
  const [selectedTake, setSelectedTake] = useState({});
  const [alertState, setAlertState] = useState(false);
  const [archivo, setArchivo] = useState([]);

  
  const [deposito, setDeposito] = useState({
    _id: uuidv4(),
    bancoDeposito: "",
    depositoMonto: "",
    nombreDeposito: "",
    comentarioDeposito: "",
    fechaDeposito: new Date(),
    fechaDepositoStr: moment().format("YYYY/MM/DD"),
  });

  const [retorno, setRetorno] = useState({
    _id: uuidv4(),
    nombreRetorno: "",
    entidadRetorno: "",
    retornoMonto: "",
    comentarioRetorno: "",
    cuentaRetorno: "",
    formaRetorno: "Efectivo",
    Banco: "",
    Cuenta_clabe: "",
    codigoSwift: "",
    direccionBanco: "",
  });

  const [comision, setComision] = useState({
    _id: uuidv4(),
    Tipo: "Comision Agente",
    Monto: 0,
    Comentarios: "",
    Porcentaje: 0,
  });

  const [movimiento, setMovimiento] = useState({
    agente: "",
    nombre: "",
    cliente: "",
    cantidadTotal: 0,
    comisionAgente: 0,
    comisionOficina: 0,
    estatusFactura: "Pendiente",
    estatusRetorno: "Pendiente",
    estatusDeposito: "Pendiente",
    totalDepositos: 0,
    totalRetornos: 0,
    totalComisiones: 0,
    solicitudId: null,
    idAgente: 0,
    idCliente: 0,
    
  });

  const calculartotal = () => {
    setTotalMovimiento(totalDepositos - totalRetornos - totalComisiones);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseAdd = () => {
    setModalState(false);
    setModalStateFacturas(false);
  };

  const handleSaveAdd = (params) => {
    setModalState(false);
    switch (activeTab) {
      case 0:
        addDepositoIntab();
        break;
      case 1:
        addRetornoIntab();
        break;
      case 2:
        addComisionIntab();
        break;
      default:
        break;
    }
  };

  const addDepositoIntab = () => {
    setTotalDepositos(
      parseFloat(totalDepositos) + parseFloat(deposito.depositoMonto)
    );
    
    setDepositos([...depositos,deposito]);
    setDeposito({
      _id: uuidv4(),
      bancoDeposito: "",
      depositoMonto: "",
      nombreDeposito: "",
      comentarioDeposito: "",
      fechaDeposito: new Date(),
      fechaDepositoStr: moment().format("YYYY/MM/DD"),
    });
  };

  const addRetornoIntab = () => {
    setTotalRetornos(
      parseFloat(totalRetornos) + parseFloat(retorno.retornoMonto)
    );
    setRetornos([...retornos, retorno ]);
    setRetorno({
      _id: uuidv4(),
      nombreRetorno: "",
      entidadRetorno: "",
      retornoMonto: "",
      comentarioRetorno: "",
      cuentaRetorno: "",
      formaRetorno: "Efectivo",
      Banco: "",
      Cuenta_clabe: "",
      codigoSwift: "",
      direccionBanco: "",
    });
  };

  const addComisionIntab = () => {
    setTotalComisiones(
      parseFloat(totalComisiones) + parseFloat(comision.Monto)
    );
    setComisiones([...comisiones, comision]);
    setComision({
      _id: uuidv4(),
      Monto: 0,
      Tipo: "Comision Agente",
      Comentarios: "",
      porcentaje: 0,
    });
  };

  const handleOnChangeDepositoForm = (e) => {
    setDeposito({
      ...deposito,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeRetornoForm = (e) => {
    setRetorno({
      ...retorno,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeMovimientoForm = (e) => {
    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeComisionForm = (e) => {
    setComision({
      ...comision,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setDeposito({
      ...deposito,
      fechaDeposito: date,
      fechaDepositoStr: date.format("YYYY/MM/DD"),
    });
  };

  const handleAddClick = () => {
    setModalState(true);
  };

  const handleDeleteClick = (obj) => {
    switch (activeTab) {
      case 0:
        setDepositos(
          [...depositos.filter(
            depo => depo._id !== obj._id
          )]
        );
        setTotalDepositos(
          parseFloat(totalDepositos) - parseFloat(obj.depositoMonto)
        );
        break;
      case 1:
        setRetornos(
          [...retornos.filter(
            ret => ret._id !== obj._id
          )]
        )
        setTotalRetornos(
          parseFloat(totalRetornos) - parseFloat(obj.retornoMonto)
        );
        break;
      case 2:
        setComisiones(
          [...comisiones.filter(
            com => com._id !== obj._id
          )]
        )
        setTotalComisiones(parseFloat(totalComisiones) - parseFloat(obj.Monto));
        break;
      default:
        break;
    }
  };

  const OnSaveMovimiento = () => {
    //dispatch(startSaveMovimiento(movimiento));
    const data = new FormData();
    data.append('file', archivo[0]);

    const movimientoObj = {
      movimiento,
      depositos,
      retornos,
      comisiones,
    };

    const json = JSON.stringify(movimientoObj);
    data.append('movimientoObj', json);
    try {
      const saveMovimiento = async () => {
        const response = await axios.post(process.env.REACT_APP_API + `/movimiento/nuevo`, 
        data, 
        {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        }).then((response) => {
          history.push("/movimientos");
          console.log("Saved");
        }, (error) => {
          console.log("error", error);
        });
        
      }
      saveMovimiento();

    }catch(e){
      console.log("Error al guardar", e);
    }
  };

  const onCalculoPorcentaje = () => {
    let resultado = parseFloat(
      (parseFloat(movimiento.cantidadTotal) / 1.16) *
        (parseFloat(comision.Porcentaje) / 100)
    ).toFixed(2);

    setComision({
      ...comision,
      Monto: resultado,
    });
  };

  const handleFileUpload = (file) => {
    setArchivo(file);
  };

  useEffect(() => {
    calculartotal();
    setMovimiento({
      ...movimiento,
      totalDepositos: totalDepositos,
      totalRetornos: totalRetornos,
      totalComisiones: totalComisiones,
    });
   
  }, [totalDepositos, totalRetornos, totalComisiones]);

  useEffect(() => {
    //consultamos con la api la base de datos llamamos startGetTickets
    const getAgentes = async () => {
      const response = await axios.get(process.env.REACT_APP_API + `/listado/agente`);
      setAgentesList(response.data);
    }
    getAgentes()
  }, []);

  const OnAgenteChange = (e) => {
    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
      idAgente: e.target.value,
    });
    const agente = {
      _id: e.target.value,
    };
    getClientes(agente);
  };
  const getClientes = async (agente) => {
    const response = await axios.post(process.env.REACT_APP_API + `/filtro/agente`, agente);
    setClientesList(response.data);
  }

  const OnClienteChange = (e) => {
    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
      idCliente: e.target.value,
    });

    const cliente = {
      _id: e.target.value,
    };

    //dispatch(startSolicitud(cliente));
  };

  const handleTake = () => {
    setMovimiento({
      ...movimiento,
      solicitudId: selectedTake._id,
    });
    setAlertState(!alertState);
    setModalStateFacturas(!ModalStateFacturas);
  };

  const toggleTake = () => {
    setAlertState(!alertState);
  };

  const handleFacturas =(solicitud)=>{
    setModalStateFacturas(true);
    setSelectedTake(solicitud);
  }
  const onQuitarSolicitud = () =>{
    setMovimiento({
      ...movimiento,
      solicitudId: null
    }) 
  }
  let  { solicitudId } = movimiento; 

    return ( 
    <Fragment>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveAltIcon />}
              onClick={OnSaveMovimiento}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <MovimientoForm
                onChange={handleOnChangeMovimientoForm}
                OnAgenteChange={OnAgenteChange}
                OnClienteChange={OnClienteChange}
                movimiento={movimiento}
              /> 
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom color="textSecondary">
                    Balance
                  </Typography>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    <CountUp
                      start={startCounter}
                      end={totalMovimiento}
                      duration={2}
                      separator=","
                      decimals={2}
                      decimal="."
                      prefix="$ "
                     
                    />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom color="textSecondary">
                    Depositos
                  </Typography>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    <CountUp
                      start={startCounter}
                      end={totalDepositos}
                      duration={2}
                      separator=","
                      decimals={2}
                      decimal="."
                      prefix="$ "
                      
                    />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom color="textSecondary">
                    Retornos
                  </Typography>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    <CountUp
                      start={startCounter}
                      end={totalRetornos}
                      duration={2}
                      separator=","
                      decimals={2}
                      decimal="."
                      prefix="$ "
                      
                    />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom color="textSecondary">
                    Comisiones
                  </Typography>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    <CountUp
                      start={startCounter}
                      end={totalComisiones}
                      duration={2}
                      separator=","
                      decimals={2}
                      decimal="."
                      prefix="$ "
                      
                    />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              aria-label="Movimientos tab"
              value={activeTab}
              onChange={handleChange}
            >
              <Tab label="Depositos" />
              <Tab label="Retornos" />
              <Tab label="Comisiones" />
              <Tab label="Adjunto" />
              <Tab label="Facturas" />
            </Tabs>
          </Grid>
          <Grid item xs={1}>
            <Fab color="primary" aria-label="add" onClick={handleAddClick}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TabPanel value={activeTab} index={0}>
                  
                <DepositosTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
              
                <RetornosTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <ComisionTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
                </TabPanel>
              <TabPanel value={activeTab} index={3}>
              
                
                <DropzoneArea
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                    previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                    previewChipProps={{classes: { root: classes.previewChip } }}
                    previewText="Archivo cargado"
                    onChange={(file) => handleFileUpload(file)}
                    maxFileSize={3000000}
                    acceptedFiles={[".xml", ".pdf", ".xlsx", ".xls", ".doc",".docx",".xml", ".csv"]}
                    filesLimit={1}
                    initialFiles={archivo}
                  /> 
                
              </TabPanel>

              <TabPanel value={activeTab} index={4}>
                {
                 solicitudId ===null ? (
                  <Fragment>
                    <h3>SOLICITUD DE FACTURAS PENDIENTES DE ASIGNAR </h3>
                    {/*<SolicitudFactura
                    handleFacturas={(obj)=> handleFacturas(obj)}
                    />*/}
                  </Fragment>): 
                 (
                   <Fragment>
                    <h3>FACTURAS ASIGNADAS AL MOVIMIENTO </h3>
                    <FacturaTable />
                    <Button size="small" color="primary" variant="contained" onClick={onQuitarSolicitud}>
                      QUITAR
                    </Button>
                  </Fragment>
                 )
                 }
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
       <ModalForm
          ModalState={ModalState}
          handleCloseAdd={handleCloseAdd}
          handleSaveAdd={handleSaveAdd}
          ButtonText ={"Guardar"}
        >
          <Paper className={classes.paperModal}>
            {activeTab === 0 ? (
              <DepositoForm
                handleOnChange={handleOnChangeDepositoForm}
                handleDateChange={handleDateChange}
                selectedDate={deposito.fechaDeposito}
              />
            ) : activeTab === 1 ? (
              <RetornoForm
                handleOnChange={handleOnChangeRetornoForm}
                data={retorno}
              />
            ) : activeTab === 2 ? (
              <ComisionForm
                handleOnChange={handleOnChangeComisionForm}
                onCalculoPorcentaje={onCalculoPorcentaje}
                comision={comision}
              />
            ) : activeTab === 3 ? (
              <div></div>
            ) : (
              <div></div>
            )}
          </Paper>
        </ModalForm>
        <AlertForm
          alertState={alertState}
          handleClose={ toggleTake}
          handleTake={handleTake}
          title={"Enlace facturación"}
        >
          {"Deseas asignar la solicitud de factura al movimiento?"}
        </AlertForm>
        
         <ModalForm
          ModalState={ModalStateFacturas}
          handleCloseAdd={handleCloseAdd}
          handleSaveAdd={handleCloseAdd}
          ButtonText ={"CERRAR"}
        >
        
        <Card>
        <CardHeader title="Asignar solicitud al movimiento" />
      <Divider />
      <CardContent>
        <FacturaTable />
        </CardContent>

        </Card>
        <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={toggleTake}>
          ASIGNAR
        </Button>
      </CardActions>
      
        </ModalForm>

      </Container>
    </Fragment>
     );
}
 
export default NuevoMovimiento;