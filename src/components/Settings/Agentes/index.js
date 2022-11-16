import React, { useState } from "react";
import axios from "axios";
import Table from "./Table";
import { Button, Container, Grid } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { useStyles } from "../../Styles/style";
import AgenteDialog from "./AgenteDialog";

const Agentes = () => {
  const [agentes, setAgentes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useState(() => {
    const getFacturas = async () => {
      const response = await axios.get(process.env.REACT_APP_API + `agentes`);
      setAgentes([...response.data]);
    };
    getFacturas();
  }, []);

  const handleOpenModal = () => {
    setOpen(!open);
  };
  const handleSave = () => {};

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.paperTitle}>
              <h2>Agentes</h2>
            </div>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CreateIcon />}
              onClick={handleOpenModal}
            >
              Nuevo
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={agentes} />
          </Grid>
        </Grid>
      </Container>
      <AgenteDialog
        open={open}
        handleClose={handleOpenModal}
        handleSave={handleSave}
        nombre={nombre}
      />
    </>
  );
};

export default Agentes;
