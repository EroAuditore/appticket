import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ClienteModal = ({
  status,
  handleClose,
  cliente,
  agente,
  handleChange,
  handleGuardar,
  OnAgenteChange,
  agentesList,
}) => {
  const { nombre, RFC, direccion, email } = cliente;
  return (
    <Dialog
      open={status}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="tipo">Agente</InputLabel>
              <Select
                labelId="Agente"
                id="Agente"
                name="agente"
                onChange={OnAgenteChange}
                fullWidth
                value={agente}
              >
                {agentesList.map((row) => (
                  <MenuItem key={row._id} value={row._id}>
                    {row.Agente}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoFocus
              margin="dense"
              id="Nombre"
              label="Nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoFocus
              margin="dense"
              id="RFC"
              label="RFC"
              name="RFC"
              value={RFC}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoFocus
              margin="dense"
              id="direccion"
              label="direccion"
              name="direccion"
              value={direccion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleGuardar} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClienteModal;
