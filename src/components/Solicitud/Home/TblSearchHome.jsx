import React, { useContext } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { forwardRef } from "react";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { SolicitudContext } from "../Context/SolicitudContext";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const renderCell = (item) => {
  let renderText = "";
  let renderClass = "";
  switch (item) {
    case "1": {
      renderText = "Pendiente";
      renderClass = "badge bg-secondary";
      break;
    }
    case "2": {
      renderText = "Atendiendo";
      renderClass = "badge bg-warning";
      break;
    }
    case "3": {
      renderText = "Finalizado";
      renderClass = "badge bg-success";
      break;
    }

    default: {
      renderText = "Pendiente s";
      renderClass = "badge bg-secondary";
      break;
    }
  }

  return (
    <h6>
      <span className={renderClass}>{renderText}</span>
    </h6>
  );
};

const TblSearchHome = ({ selectedTake }) => {
  const { solicitudes } = useContext(SolicitudContext);
  return (
    <>
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={[
          { title: "#", field: "_id" },
          { title: "Agente", field: "Agente" },
          { title: "Cliente", field: "Cliente" },
          { title: "Fecha", field: "fecha", type: "date" },
          {
            title: "Cantidad total",
            field: "Total_Solicitud",
            type: "currency",
          },
          {
            title: "Estatus",
            field: "Estatus_Facturacion",
            render: (rowData) => renderCell(rowData.Estatus_solicitud),
          },

          {
            title: "",
            render: (rowData) => (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => selectedTake(rowData)}
              >
                Validar
              </Button>
            ),
          },
        ]}
        data={solicitudes}
      />
    </>
  );
};

export default TblSearchHome;
