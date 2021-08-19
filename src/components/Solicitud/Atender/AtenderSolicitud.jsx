import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';
import DialogBox from './DialogBox';
import { v4 as uuidv4 } from 'uuid';
import FacturasTable from './FacturasTable';
import { DropzoneDialog } from 'material-ui-dropzone';
import SolicitudView from './SolicitudView';
import FacturaCForm from './../Common/FacturaCForm';
import TabPanel from './../../Common/TabPanel';
import TableFiles from './../../Archivos/TableFiles';
import MovimientoTable from './MovimientoTable';
import MovimientoView from './MovimientoView';

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
    textAlign: 'left',
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

const AtenderSolicitud = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [dialogState, setDialogState] = useState(false);
  const [totalSolicitud, setTotalSolicitud] = useState(0);
  const [startCounter, setStartCounter] = useState(0);
  const [openFile, setOpenFile] = React.useState(false);
  const [openPDF, setOpenPDF] = React.useState(false);
  const [factura, setFactura] = useState({});
  const [facturas, setFacturas] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [movimiento, setMovimiento] = useState({});
  const [xml, setXml] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [files, setFiles] = useState([]);
  let { id: solicitudId } = useParams();

  const [solicitud, setSolicitud] = useState({
    Agente: '',
    Cliente: '',
    Comentarios: '',
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

    //dispatch(deleteFactura(facturaEdit._id));
  };

  const onSaveSol = () => {
    console.log(totalSolicitud);
    setSolicitud({ ...solicitud, totalSolicitud: totalSolicitud });
    ///dispatch(startSaveFacturas(solicitud));
    console.log('guardando la solicitud');
  };

  const OnUploadXML = (row) => {
    //setFactura({ ...row, userId: getCurrentUserID() });
    setOpenFile(true);
  };

  const OnUploadPDF = (row) => {
    //setFactura({ ...row, userId: getCurrentUserID() });
    setOpenPDF(true);
  };

  useEffect(() => {
    //console.log("lenght", xml.length);
    /*console.log( ( &&xml));*/
    //if (xml.length > 0) dispatch(startUploadXML({ ...factura, Archivo: xml }));
  }, [xml]);

  useEffect(() => {
    //console.log("lenght", pdf.length);
    /*console.log( ( &&xml));*/
    //if (pdf.length > 0) dispatch(startUploadPDF({ ...factura, Archivo: pdf }));
  }, [pdf]);
  const getMovimientoView = async (idMovimiento) => {
    const response = await axios.get(
      process.env.REACT_APP_API + `/movimiento/id/${idMovimiento}`
    );
    setMovimiento(response.data[0]);
  };

  useEffect(() => {
    const getMovPendientes = async (idCliente) => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/movimientos/pendientes/facturar`,
        { idCliente }
      );
      setMovimientos(response.data);
    };

    const getData = async () => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/movimiento/facturas/tomar`,
        { _id: solicitudId }
      );
      const { solicitud: sol, facturas: facts } = response.data;
      setSolicitud({
        ...solicitud,
        ...sol,
      });
      setFacturas([...facts]);

      setTotalSolicitud(parseInt(sol.Total_Solicitud));
      if (sol.id_movimiento === null) {
        getMovPendientes(sol.idCliente);
      } else {
        getMovimientoView(sol.id_movimiento);
      }
    };
    const getDataFiles = async () => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/files/solicitud`,
        { _id: solicitudId }
      );
      setFiles(response.data);
    };
    getData();
    getDataFiles();
  }, []);

  const handleDownloadClick = (item) => {
    window.open(process.env.REACT_APP_FILESURL + item._id, 'blank');
  };

  const handleAsignaMovimiento = (movRow) => {
    const { _id: solId } = solicitud;
    const asignaMovimiento = async () => {
      const response = await axios.post(
        process.env.REACT_APP_API + `/solicitud/movimiento/asignar`,
        { idMovimiento: movRow._id, solicitudId: solId }
      );
      getMovimientoView(movRow._id);
      setSolicitud({
        ...solicitud,
        id_movimiento: movRow._id,
      });
    };
    asignaMovimiento();
  };

  const { id_movimiento } = solicitud;

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <div className={classes.paperTitle}>
              <h2>Solicitud de facturación</h2>
            </div>
          </Grid>
          <Grid item xs={2}>
            {/*<Button
              variant="contained"
              color="primary"
              startIcon={<SaveAltIcon />}
              onClick={onSaveSol}
            >
              Guardar
            </Button>*/}
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <SolicitudView solicitud={solicitud} />
            </Paper>
            <Grid item xs={12}>
              {/*<Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddBoxIcon />}
                onClick={onAgregar}
              >
                Agregar
              </Button> */}
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
              <Tab label="Facturas a generar" />
              <Tab label="Archivo" />
              <Tab label="Movimiento" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TabPanel value={activeTab} index={0}>
                <FacturasTable
                  onDelete={(facturaEdit) => handleDeleteClick(facturaEdit)}
                  OnUploadXML={(row) => OnUploadXML(row)}
                  OnUploadPDF={(row) => OnUploadPDF(row)}
                  facturas={facturas}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <TableFiles
                  handleDownloadClick={(item) => handleDownloadClick(item)}
                  data={files}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                {id_movimiento === null ? (
                  <MovimientoTable
                    toggleTake={(item) => handleAsignaMovimiento(item)}
                    movimientos={movimientos}
                  />
                ) : (
                  <MovimientoView movimiento={movimiento} />
                )}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
        <DialogBox
          dialogState={dialogState}
          handleClose={handleClose}
          handleOk={handleAddClick}
          title="Datos de la factura"
        >
          <FacturaCForm
            data={factura}
            handleOnChange={handleOnChangeFacturaForm}
            handleChecked={handleChecked}
          />
        </DialogBox>

        <DropzoneDialog
          acceptedFiles={['.xml']}
          cancelButtonText={'cancelar'}
          submitButtonText={'subir XML'}
          filesLimit={1}
          maxFileSize={5000000}
          open={openFile}
          onClose={() => setOpenFile(false)}
          onSave={(files) => {
            console.log('Files:', files);
            setXml(files);
            setOpenFile(false);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />

        <DropzoneDialog
          acceptedFiles={['.pdf']}
          cancelButtonText={'cancelar'}
          submitButtonText={'subir PDF'}
          filesLimit={1}
          maxFileSize={5000000}
          open={openPDF}
          onClose={() => setOpenPDF(false)}
          onSave={(files) => {
            console.log('Files:', files);
            setPdf(files);
            setOpenPDF(false);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </Container>
    </React.Fragment>
  );
};

export default AtenderSolicitud;
