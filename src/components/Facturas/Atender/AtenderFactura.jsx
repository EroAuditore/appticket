import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router';
import axios from "axios";
import {
  Button,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  Tabs,
  Tab,
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FacturaGenView from "./FacturaGenView";
import TabPanel from "./../../Common/TabPanel";
import MovimientosPTable from "./MovimientosPTable";
import AlertForm from "./../../Common/AlertForm";
import MovimientoFormView from "./MovimientoFormView";
import FacturaTempView from "./FacturaTempView";
import FilesFactura from "./FilesFactura";
import AlertFormInfo from './../../Common/AlertFormInfo';

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
  paperContent: {
    padding: 30,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AtenderFactura = () => {
  const classes = useStyles();
  let { id :facturaId } = useParams();
  const [xml, setXml] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [factura, setFactura] = useState({});
  const [xmlUploaded, setXmlUploaded] = useState({});
  const [movimiento, setMovimiento] = useState({});
  const [openFile, setOpenFile] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [alertState, setAlertState] = useState(false);
  const [alertStateAM, setAlertStateAM] = useState(false);
  const [processState,setProcessState] = useState(false);

    const idMovimiento = null;
  const OnUploadXML = () => {
    
    setOpenFile(true);
  };

  const OnUploadPDF = () => {
    //setFactura({ ...data, userId: getCurrentUserID() });
    setOpenPDF(true);
  };

  useEffect(() => {
    //Cuando cambie el XMl se manda por ws y trae el XML
    if (xml.length > 0) {
      const data = new FormData();
      data.append('file', xml[0]);
      const json = JSON.stringify(factura);
      data.append('solicitudObj', json);
      const uploadXml = async () => {
        const response = await axios.post(process.env.REACT_APP_API + `/factura/xml/test`, 
        data, 
        {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        }).then((response) => {
         console.log("uploaded", response);
         setXmlUploaded({
          ...response.data
         })
        }, (error) => {
          console.log("error", error);
        });
        
      }
      uploadXml();
    }
    
  }, [xml]);

  useEffect(() => {
    //console.log("lenght", pdf.length);
    //if (pdf.length > 0) dispatch(startUploadPDF({ ...factura, Archivo: pdf }));
  }, [pdf]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTake = () => {
    //dispatch(startAFAM(movimiento));
    setAlertState(!alertStateAM);
  };

  const toggleTake = (row) => {
    setMovimiento(row);
    setAlertStateAM(!alertStateAM);
  };

  const doUploadXML = () => {
    //subimos el XML a la nube
    if (xml.length > 0)
    {
      const data = new FormData();
      data.append('file', xml[0]);
      const json = JSON.stringify(factura);
      data.append('solicitudObj', json);
      const uploadXml = async () => {
        const response = await axios.post(process.env.REACT_APP_API + `/factura/xml`, 
        data, 
        {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        }).then((response) => {
         console.log("saved xml", response);
         setFactura({
          ...response.data[0]
        })
        
        }, (error) => {
          console.log("error", error);
        });
      }
        uploadXml();
    }
     
  };

  const saveXML = () => {

  }

  //const processState = useSelector((state) => processSelector(state));

  const handleProcess = () => {
    //dispatch(startProcess());
  };
  const handleDownloadClick = (item) => {
    /*window.open(filesURL + item._id, "blank");*/
  };

  useEffect(()=>{
    
    const getFacturas = async () => {
      const response = await axios.post(process.env.REACT_APP_API + `/factura/generar`, {_id: facturaId});
      console.log(response.data);
      setFactura({
        ...response.data.factura
      })
      
    }
    getFacturas();
  },[])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.paperTitle}>
            <h2>Facturación</h2>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            aria-label="Movimientos tab"
            value={activeTab}
            onChange={handleChange}
          >
            <Tab label="Factura" />
            <Tab label="Movimiento" />
            <Tab label="Adjunto" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Card>
                  <CardHeader title="Información capturada" />
                  <CardContent>
                    <FacturaGenView data={factura} />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => OnUploadXML()}
                      size="small"
                    >
                      Cargar XML
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item md={5}>
                <Card>
                  <CardHeader title="Datos XML" />
                  <CardContent>
                    <FacturaTempView data={xmlUploaded} />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<SaveAltIcon />}
                      onClick={() => doUploadXML()}
                      size="small"
                    >
                      Guardar XML
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<SaveAltIcon />}
                      onClick={() => OnUploadPDF()}
                      size="small"
                    >
                      Guardar PDF
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Grid item md={8}>
              <Card>
                <CardContent>
                  {idMovimiento && <MovimientoFormView />}
                  {!idMovimiento && (
                    <MovimientosPTable toggleTake={toggleTake} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Paper></Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <FilesFactura
              handleDownloadClick={(item) => handleDownloadClick(item)}
            />
          </TabPanel>
        </Grid>
      </Grid>

      <DropzoneDialog
        acceptedFiles={[".xml"]}
        cancelButtonText={"cancelar"}
        submitButtonText={"Subir XML"}
        filesLimit={1}
        maxFileSize={5000000}
        open={openFile}
        onClose={() => setOpenFile(false)}
        onSave={(files) => {
          setXml(files);
          setOpenFile(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />

      <DropzoneDialog
        acceptedFiles={[".pdf"]}
        cancelButtonText={"cancelar"}
        submitButtonText={"subir PDF"}
        filesLimit={1}
        maxFileSize={5000000}
        open={openPDF}
        onClose={() => setOpenPDF(false)}
        onSave={(files) => {
          console.log("Files:", files);
          setPdf(files);
          setOpenPDF(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />

      <AlertForm
        alertState={alertStateAM}
        handleClose={toggleTake}
        handleTake={handleTake}
        title={"Asignar movmiento"}
      >
        {"Deseas asignar el movimiento a la factura?"}
      </AlertForm>

      <AlertForm
        alertState={alertState}
        handleClose={toggleTake}
        handleTake={handleTake}
        title={"Guardar XML"}
      >
        {"Deseas guardar el XML, se reemplazaran los datos capturados?"}
      </AlertForm>


      <AlertFormInfo
        alertState={processState}
        handleClose={handleProcess}
        handleTake={handleProcess}
        title={"Acción realizada"}
      >
        {"Documento cargado exitosamente"}
      </AlertFormInfo>
    </React.Fragment>
  );
};

export default AtenderFactura;
