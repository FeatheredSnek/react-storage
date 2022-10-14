import React from "react";
import TableHeader from "../../components/TableHeader";

const StatusHeader = () => {
  // get total from the store
  const total = 345678.66
  
  return (
    <TableHeader
      title="Storage status"
      subTitle={`${total} PLN`}
      noButton={true}
      // actionScope="inbound"
      // actionId={null}
    />
  )
}

export default StatusHeader