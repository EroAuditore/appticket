import React, { useContext } from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { MovimientoContext } from "./../Context/MovimientoContext";

import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    color: "red",
  },
}));

const MovimientoTable = (props) => {
  const { depositos, comisiones, retornos } = useContext(MovimientoContext);

  const classes = useStyles();

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Descripción</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left"></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {depositos.map((row) => (
          <TableRow key={"d" + row._id}>
            <TableCell align="left">{row.nombreDeposito}</TableCell>
            <TableCell align="left">
              <NumberFormat
                value={row.depositoMonto}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        ))}
        {retornos.map((row) => (
          <TableRow key={"r" + row._id}>
            <TableCell align="left">{row.Nombre}</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left" className={classes.tableCell}>
              {"- "}
              <NumberFormat
                value={row.Monto}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </TableCell>
          </TableRow>
        ))}

        {comisiones.map((row) => (
          <TableRow key={"r" + row._id}>
            <TableCell align="left">{row.Tipo}</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left" className={classes.tableCell}>
              -{" "}
              <NumberFormat
                value={row.Monto}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MovimientoTable;
