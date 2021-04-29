
import React, { Fragment, useContext } from "react";

import { Grid, TextField, Typography, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { SolicitudContext } from './../../Context/SolicitudContext';



const Form = (props) => {
  const { data, OnAgenteChange, OnClienteChange } = props;
  const {  Agente, Cliente } = data;
  const { agentesList, clientesList } = useContext(SolicitudContext);
  return (
    <Fragment>
      
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="tipo">Agente</InputLabel>
            <Select
              labelId="Agente"
              id="Agente"
              name="Agente"
              onChange={OnAgenteChange}
              fullWidth
              value={Agente}
            >
              {agentesList.map((row) => (
                <MenuItem key={row._id} value={row._id}>
                  {row.Agente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="tipo">Cliente</InputLabel>
            <Select
              labelId="Cliente"
              id="Cliente"
              name="Cliente"
              onChange={OnClienteChange}
              fullWidth
              value={Cliente}
            >
              {clientesList &&
                clientesList.map((row) => (
                  <MenuItem key={row._id} value={row._id}>
                    {row.Cliente}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Form;
