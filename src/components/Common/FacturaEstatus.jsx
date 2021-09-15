import React from 'react';

const FacturaEstatus = ({ data }) => {
  /* if (!data) return <div></div>;*/

  let renderText = '';
  let renderClass = '';
  switch (data) {
    case '0': {
      renderText = 'SOLICITADA';
      renderClass = 'badge bg-secondary';
      break;
    }
    case '1': {
      renderText = 'EN PROCESO';
      renderClass = 'badge bg-warning';
      break;
    }
    case '2': {
      renderText = 'EMITIDA';
      renderClass = 'badge bg-success';
      break;
    }
    case 'generado': {
      renderText = 'PAGADA';
      renderClass = 'badge bg-success';
      break;
    }

    case '4': {
      renderText = 'CANCELADA';
      renderClass = 'badge bg-danger';
      break;
    }
    default: {
      renderText = 'PENDIENTE';
      renderClass = 'badge bg-secondary';
      break;
    }
  }

  return (
    <h6>
      <span className={renderClass}>{renderText}</span>
    </h6>
  );
};

export default FacturaEstatus;
