import React, { Fragment } from "react";

import { Grid, TextField, Typography} from "@material-ui/core";
import NumberFormatCustom from './../../Common/NumberFormartCustom';

const MovimientoForm = (props) => {
  const { movimiento } = props;
  const { cantidadTotal, agente, cliente } = movimiento;

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Nuevo movimiento
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="Agente"
            name="agente"
            label="Agente"
            fullWidth
            size="small"
            value={agente}
            InputProps={{
              readOnly: true,
            }}
            
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Cliente"
            name="cliente"
            label="Cliente"
            fullWidth
            size="small"
            value={cliente}
            InputProps={{
              readOnly: true,
            }}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cantidadTotal"
            name="cantidadTotal"
            label="Cantidad Total"
            fullWidth
            size="small"
            value={cantidadTotal}
            InputProps={{
              inputComponent: NumberFormatCustom,
              readOnly: true,
            }}
            
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MovimientoForm;
