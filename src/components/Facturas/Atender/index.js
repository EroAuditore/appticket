import React from "react";
import FacturasProvider from "../Context/FacturasContext";
import AtenderFactura from "./AtenderFactura";

export const Atender = () => {
  return (
    <FacturasProvider>
      <AtenderFactura />
    </FacturasProvider>
  );
};
