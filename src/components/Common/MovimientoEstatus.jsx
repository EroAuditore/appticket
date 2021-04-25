import React from "react";

const MovimientoEstatus = ({ data }) => {
  /* if (!data) return <div></div>;*/

  let renderText = "";
  let renderClass = "";
  switch (data) {
    case "pendiente": {
      renderText = "POR REVISAR";
      renderClass = "badge bg-secondary";
      break;
    }

    case "generado":
    case "depositado": {
      renderText = "GENERADO";
      renderClass = "badge bg-success";
      break;
    }
    case "comisionado": {
      renderText = "Generado";
      renderClass = "badge bg-danger";
      break;
    }
    
    default: {
      renderText = "POR REVISAR";
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

export default MovimientoEstatus;
