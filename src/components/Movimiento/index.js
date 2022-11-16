import React from "react";
import MovimientoProvider from "./Context/MovimientoContext";

import Home from "./Home";

const Movimiento = () => {
  return (
    <MovimientoProvider>
      <Home />
    </MovimientoProvider>
  );
};

export default Movimiento;
