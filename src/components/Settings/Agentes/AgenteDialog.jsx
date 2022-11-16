import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AgenteDialog = ({ open, handleClose, handleSave, nombre }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Nuevo agente</DialogTitle>
      <DialogContent>
        <DialogContentText>Nombre del agente a crear.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={nombre}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgenteDialog;
