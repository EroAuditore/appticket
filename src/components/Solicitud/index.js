import React from "react";
import SolicitudProvider from "./Context/SolicitudContext";

import Home from "./Home";

const Solicitud = () => {
  return (
    <SolicitudProvider>
      <Home />
    </SolicitudProvider>
  );
};

export default Solicitud;
