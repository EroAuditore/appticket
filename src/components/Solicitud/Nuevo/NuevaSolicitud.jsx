import React, { useContext, useEffect, useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CountUp from "react-countup";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { v4 as uuidv4 } from "uuid";
import ModalForm from "./../../Common/ModalForm";
import TabPanel from "./../../Common/TabPanel";
import Form from "./Form";
import DialogBox from './DialogBox';
import { SolicitudContext } from './../../Context/SolicitudContext';
import FacturaCForm from "../Common/FacturaCForm";
import FacturaTable from './FacturaTable';

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
}));

const NuevaSolicitud = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogState, setDialogState] = useState(false);
  const [totalSolicitud, setTotalSolicitud] = useState(0);
  const [startCounter, setStartCounter] = useState(0);
  const [ModalState, setModalState] = useState(false);
  const [archivo, setArchivo] = useState([]);
  const history = useHistory();
  const {setAgentesList, 
    setClientesList, 
    setFacturas,
    facturas
  } = useContext(SolicitudContext);

  const [factura, setFactura] = useState({
    _id: uuidv4(),
    RFC: "",
    Cliente: "",
    empresaFacturadora: "",
    conceptoFactura: "",
    condicionPago: "",
    formaPago: "",
    montoTotal: "",
    usoCFDI: "",
    tipoComprobante: "",
    metodoPago: "",
    direccionCliente: "",
    email: "",
    generada: false,
    moneda: "MNX - Pesos",
    subTotal: "",
    iva: "",
    partidas: [],
  });

  const [solicitud, setSolicitud] = useState({
    Agente: "",
    Cliente: "",
    Comentarios: "",
    totalSolicitud: 0,
    userId: null,//getCurrentUserID(),
    Archivo: [],
  });

  const [partida, setPartida] = useState({
    _id: uuidv4(),
    facturaId: "",
    cantidad: 0,
    claveUnidad: "",
    clavePs: "",
    descripcion: "",
    valorUnitario: 0,
    importe: 0,
  });
  const handleOnChangeFacturaForm = (e) => {
    setFactura({
      ...factura,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeSolitudForm = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
    });
  };
  const handleChecked = (event) => {
    setFactura({ ...factura, [event.target.id]: event.target.checked });
  };

  const handleOnChangePartidaForm = (e) => {
    setPartida({
      ...partida,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log("Handleupdate Start Update Factura", factura);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    /*setModalState(true); */
    setDialogState(false);
  };
  const handleAddClick = () => {
    setTotalSolicitud(
      parseFloat(totalSolicitud) + parseFloat(factura.montoTotal)
    );
    setFactura({ ...factura, _id: uuidv4() });
    //dispatch(addFactura(factura));
    setFacturas([...facturas, factura])
    setDialogState(false);
  };

  const onAgregar = () => {
    setDialogState(true);
  };

  const handleCountUp = () => {
    setStartCounter(totalSolicitud);
  };

  const handleDeleteClick = (facturaEdit) => {
    setTotalSolicitud(
      parseFloat(totalSolicitud) - parseFloat(facturaEdit.montoTotal)
    );
    setFacturas ( [
        ...facturas.filter(factura => factura._id !== facturaEdit._id)
      ])
    
  };

  const onSaveSol = () => {
    //dispatch(startSaveFacturas(solicitud));

    const data = new FormData();
    data.append('file', archivo[0]);

    const solicitudObj = {
        solicitud,
        facturas,
      };
    const json = JSON.stringify(solicitudObj);

    data.append('solicitudObj', json);

    try {
      const saveSolicitud = async () => {
        const response = await axios.post(process.env.REACT_APP_API + `/solicitud/guardar`, 
        data, 
        {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        }).then((response) => {
          history.push("/solicitudes");
          
        }, (error) => {
          console.log("error", error);
        });
        
      }
      saveSolicitud();
    }catch(e){
        console.log("Error al guardar", e);
    }
    
  };

  useEffect(() => {
    //consultamos con la api la base de datos llamamos startGetTickets
    const getAgentes = async () => {
        const response = await axios.get(process.env.REACT_APP_API + `/listado/agente`);
        setAgentesList(response.data);
      }
      getAgentes()
  }, []);

  

  const OnAgenteChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
      idAgente: e.target.value,
    });

    const agente = {
      _id: e.target.value,
    };
    //dispatch(startClientes(agente));
    const getClientes = async (agente) => {
        const response = await axios.post(process.env.REACT_APP_API + `/filtro/agente`, agente);
        setClientesList(response.data);
      }
    getClientes(agente);    
  };

  const OnClienteChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
      idCliente: e.target.value,
    });

    const cliente = {
      _id: e.target.value,
    };
    //dispatch(startCliente(cliente));
    const getCliente = async (cliente) => {
        const response = await axios.post(process.env.REACT_APP_API + `/cliente/filtrar`, cliente);
        
        setFactura({
            ...factura,
            RFC: response.data[0].RFC,
            Cliente: response.data[0].razonSocial,
            email: response.data[0].email,
            direccionCliente: response.data[0].direccion,
          });
      }
    getCliente(cliente);    
  
  };

  const handleCloseAdd = () => {
    setModalState(false);
  };

  const handleSaveAdd = (params) => {
    setModalState(false);
  };

  const handleAddPartida = (row) => {
    setModalState(true);
    setPartida({
      ...partida,
      _id: uuidv4(),
      facturaId: row._id,
      selectedFactura: row,
    });
  };

  const handleNewPartida = () => {
    //dispatch(addPartida(partida));
  };

  const handleFileUpload = (file) => {
    if (file.length == 0) return;
    console.log('file:', file)
    setSolicitud({
      ...solicitud,
      Archivo: file,
    });
  };
  const handledeleteFile =() =>{
    console.log('delete:')
    setSolicitud({
      ...solicitud,
      Archivo: [],
    });
  }
  const onCalculoTotal = () => {
    const { subTotal } = factura;
    setFactura({
      ...factura,
      iva: parseFloat(subTotal) * 0.16,
      montoTotal: parseFloat(subTotal) + parseFloat(subTotal) * 0.16,
    });
  };

  useEffect(() => {
    setSolicitud({ ...solicitud, totalSolicitud: totalSolicitud });
  }, [totalSolicitud]);

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <div className={classes.paperTitle}>
              <h2>Solicitud de facturas</h2>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveAltIcon />}
              onClick={onSaveSol}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Form
                data={solicitud}
                handleOnChange={handleOnChangeSolitudForm}
                OnAgenteChange={OnAgenteChange}
                OnClienteChange={OnClienteChange}
              />
            </Paper>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddBoxIcon />}
                onClick={onAgregar}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="h4" gutterBottom color="textSecondary">
                Total
              </Typography>
              <Typography variant="h4" gutterBottom color="textPrimary">
                <CountUp
                  start={startCounter}
                  end={totalSolicitud}
                  duration={2}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$ "
                  onEnd={handleCountUp}
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              aria-label="Movimientos tab"
              value={activeTab}
              onChange={handleChange}
            >
              <Tab label="Facturas" />
              <Tab label="Documento" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TabPanel value={activeTab} index={0}>
                  <h1>Factura table</h1>
                <FacturaTable
                  onDelete={(facturaEdit) => handleDeleteClick(facturaEdit)}
                  handleAddClick={(row) => handleAddPartida(row)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                {/*<DropZone onChange={(file) => handleFileUpload(file)  } deleteFile={()=>handledeleteFile()} /> */}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
        <DialogBox
          dialogState={dialogState}
          handleClose={handleClose}
          handleOk={handleAddClick}
          title="Datos de la factura"
        ></DialogBox>
        <ModalForm
          ModalState={dialogState}
          handleCloseAdd={handleClose}
          handleSaveAdd={handleAddClick}
          ButtonText ={"Guardar"}
        >
          <Paper className={classes.paperModal}>
            <FacturaCForm
              data={factura}
              handleOnChange={handleOnChangeFacturaForm}
              handleChecked={handleChecked}
              onCalculoTotal={onCalculoTotal}
            />
          </Paper>
        </ModalForm>
        <ModalForm
          ModalState={ModalState}
          handleCloseAdd={handleCloseAdd}
          handleSaveAdd={handleSaveAdd}
          ButtonText ={"Guardar"}
        >
          <Paper className={classes.paperModal}>
            {/*<PartidaForm
              handleAddPartida={handleNewPartida}
              handleOnChange={handleOnChangePartidaForm}
              data={partida}
              ButtonText ={"Guardar"}
            />*/}
          </Paper>
        </ModalForm>
      </Container>
    </React.Fragment>
  );
};

export default NuevaSolicitud;
