import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const AgenteModal = ({
  status,
  handleClose,
  nombre,
  handleChange,
  handleGuardar,
}) => {
  return (
    <Dialog
      open={status}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Agente</DialogTitle>
      <DialogContent>
        <DialogContentText>Nuevo Agente</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="Nombre"
          label="Nombre"
          value={nombre}
          onChange={handleChange}
          fullWidth
        />
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

export default AgenteModal;
