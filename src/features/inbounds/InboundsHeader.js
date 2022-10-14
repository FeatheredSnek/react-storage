import React from "react";
import TableHeader from "../../components/TableHeader";

const InboundsHeader = () => {
  // get total from the store
  const total = 12345.66
  
  return (
    <TableHeader
      title="Inbounds"
      subTitle={`${total} PLN`}
      actionScope="inbound"
      actionId={null}
    />
  )
}

export default InboundsHeader