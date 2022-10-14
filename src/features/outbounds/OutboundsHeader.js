import React from "react";
import TableHeader from "../../components/TableHeader";

const OutboundsHeader = ({ destinationName, destinationId }) => {
  // get total from the store
  const total = 12345.66
  
  return (
    <TableHeader
      title={`${destinationName} outbounds`}
      subTitle={`${total} PLN`}
      actionScope="outbound"
      actionId={destinationId}
    />
  )
}

export default OutboundsHeader