import React from "react";
import MovimientoProvider from "../Context/MovimientoContext";
import AtenderMovimiento from "./AtenderMovimiento";

const Atender = () => {
  return (
    <MovimientoProvider>
      <AtenderMovimiento />
    </MovimientoProvider>
  );
};

export default Atender;
