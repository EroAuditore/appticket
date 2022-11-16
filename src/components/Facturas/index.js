import React from "react";
import FacturasProvider from "./Context/FacturasContext";

import Home from "./Home";

const Facturas = () => {
  return (
    <FacturasProvider>
      <Home />
    </FacturasProvider>
  );
};

export default Facturas;
