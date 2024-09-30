import React from "react";

import { tailspin } from "ldrs";

tailspin.register();

const InvoiceDetailLoader = () => {
  return (
    <div
      className="flex items-start justify-start gap-3
    "
    >
      <l-tailspin size="25" stroke="5" speed="0.9" color="gray"></l-tailspin>
      <span>Loading...</span>
    </div>
  );
};

export default InvoiceDetailLoader;
