import React, { Fragment, useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import CountUp from "react-countup";
import { v4 as uuidv4 } from "uuid";
import TabPanel from "../../Common/TabPanel";
import { MovimientoContext } from "../Context/MovimientoContext";
import DepositosTab from "../Common/Depositos/DepositosTab";
import ModalForm from "../../Common/ModalForm";
import DepositoForm from "../Common/Depositos/DepositoForm";
import RetornoForm from "./../Common/Retornos/RetornoForm";
import ComisionForm from "../Common/Comisiones/ComisionForm";
import AlertForm from "./../../Common/AlertForm";
import FacturaTable from "../Common/Facturas/FacturaTable";
import RetornosTab from "./../Common/Retornos/RetornosTab";
import ComisionTab from "./../Common/Comisiones/ComisionTab";
import MovimientoView from "./MovimientoView";
import MovimientoTable from "./MovimientoTable";
import CheckAtencion from "./CheckAtencion";
import TableFiles from "./../../Archivos/TableFiles";

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

const AtenderMovimiento = () => {
  let { id: movimientoId } = useParams();
  const classes = useStyles();
  const {
    depositos,
    setDepositos,
    retornos,
    setRetornos,
    comisiones,
    setComisiones,
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
  const [files, setFiles] = useState([]);

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
    retornos: false,
    comisiones: false,
    depositos: false,
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

    setDepositos([...depositos, deposito]);
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
    setRetornos([...retornos, retorno]);
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

  const handleDeleteClick = (obj) => {
    switch (activeTab) {
      case 0:
        setDepositos([...depositos.filter((depo) => depo._id !== obj._id)]);
        setTotalDepositos(
          parseFloat(totalDepositos) - parseFloat(obj.depositoMonto)
        );
        break;
      case 1:
        setRetornos([...retornos.filter((ret) => ret._id !== obj._id)]);
        setTotalRetornos(
          parseFloat(totalRetornos) - parseFloat(obj.retornoMonto)
        );
        break;
      case 2:
        setComisiones([...comisiones.filter((com) => com._id !== obj._id)]);
        setTotalComisiones(parseFloat(totalComisiones) - parseFloat(obj.Monto));
        break;
      default:
        break;
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

  useEffect(() => {
    //consultamos con la api la base de datos para traer toda la info del movimiento
    const getData = async () => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/movimiento/atender`,
        { _id: movimientoId }
      );
      setMovimiento({
        ...movimiento,
        ...response.data.movimiento,
        retornos:
          response.data.movimiento.estatusRetorno == "generado" ? true : false,
        comisiones:
          response.data.movimiento.estatusComision == "generado" ? true : false,
        depositos:
          response.data.movimiento.estatusDeposito == "generado" ? true : false,
      });
      setDepositos(mapToDepositos(response.data.depositos));
      setRetornos(mapToRetornos(response.data.retornos));
      setComisiones(response.data.comisiones);
      setTotalDepositos(parseFloat(response.data.movimiento.totalDepositos));
      setTotalRetornos(parseFloat(response.data.movimiento.totalRetornos));
      setTotalComisiones(parseFloat(response.data.movimiento.totalComisiones));
      calculartotal();
    };
    const getDataFiles = async () => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/files/movimiento`,
        { _id: movimientoId }
      );
      setFiles(response.data);
    };
    getData();
    getDataFiles();
  }, [
    calculartotal,
    movimiento,
    movimientoId,
    setComisiones,
    setDepositos,
    setRetornos,
  ]);

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
  const handleValidate = () => {
    //dispatch(startVM(movimiento));
    axios
      .post(process.env.REACT_APP_API + "/movimiento/validar", movimiento)
      .then(
        (response) => {
          console.log("success", response);
          setMovimiento({
            ...movimiento,
            estatusDeposito: movimiento.depositos ? "generado" : "pendiente",
            estatusRetorno: movimiento.retornos ? "generado" : "pendiente",
            estatusComision: movimiento.comisiones ? "generado" : "pendiente",
          });
        },
        (error) => {
          console.log("error", error);
        }
      );
  };
  const handleChecked = (event) => {
    setMovimiento({ ...movimiento, [event.target.id]: event.target.checked });
  };
  function mapToDepositos(depositos) {
    const repl = depositos.map((obj) => ({
      _id: obj._id,
      bancoDeposito: obj.banco,
      depositoMonto: obj.monto,
      comentarioDeposito: obj.comentarios,
      fechaDeposito: obj.fecha,
      fechaDepositoStr: obj.fecha,
      ...obj,
    }));
    return repl;
  }

  function mapToRetornos(retornos) {
    const repl = retornos.map((obj) => ({
      _id: obj._id,
      nombreRetorno: obj.Nombre,
      entidadRetorno: obj.Banco,
      retornoMonto: obj.Monto,
      comentarioRetorno: obj.Comentario,
      cuentaRetorno: obj.Cuenta_clabe,
      ...obj,
    }));
    return repl;
  }

  const handleDownloadClick = (item) => {
    window.open(process.env.REACT_APP_FILESURL + item._id, "blank");
  };

  return (
    <Fragment>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <MovimientoView movimiento={movimiento} />
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
              <Tab label="Movimiento" />
              <Tab label="Depositos" />
              <Tab label="Retornos" />
              <Tab label="Comisiones" />
              <Tab label="Adjunto" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TabPanel value={activeTab} index={0}>
                <MovimientoTable />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <DepositosTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <RetornosTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <ComisionTab
                  handleDeleteClick={(obj) => handleDeleteClick(obj)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <TableFiles
                  handleDownloadClick={(item) => handleDownloadClick(item)}
                  data={files}
                />
              </TabPanel>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <CheckAtencion
              onValidate={handleValidate}
              data={movimiento}
              handleChecked={handleChecked}
            />
          </Grid>
        </Grid>
        <ModalForm
          ModalState={ModalState}
          handleCloseAdd={handleCloseAdd}
          handleSaveAdd={handleSaveAdd}
          ButtonText={"Guardar"}
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
          handleClose={toggleTake}
          handleTake={handleTake}
          title={"Enlace facturación"}
        >
          {"Deseas asignar la solicitud de factura al movimiento?"}
        </AlertForm>

        <ModalForm
          ModalState={ModalStateFacturas}
          handleCloseAdd={handleCloseAdd}
          handleSaveAdd={handleCloseAdd}
          ButtonText={"CERRAR"}
        >
          <Card>
            <CardHeader title="Asignar solicitud al movimiento" />
            <Divider />
            <CardContent>
              <FacturaTable />
            </CardContent>
          </Card>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={toggleTake}
            >
              ASIGNAR
            </Button>
          </CardActions>
        </ModalForm>
      </Container>
    </Fragment>
  );
};

export default AtenderMovimiento;
