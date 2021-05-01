import React from "react";
import NumberFormat from "react-number-format";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";


const SolicitudView = ({solicitud}) => {
  //const { Agente, Cliente } = useSelector((state) => state.facturas.solicitud);
 const {Agente, Cliente} =solicitud;

 console.log("Solicitud", solicitud);
  return (
    <Table aria-label="simple table">
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body1" gutterBottom>
              Agente
            </Typography>
            <Typography variant="body2" gutterBottom color="textSecondary">
              {Agente}
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body1" gutterBottom>
              Cliente
            </Typography>
            <Typography variant="body2" gutterBottom color="textSecondary">
              {Cliente}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SolicitudView;
