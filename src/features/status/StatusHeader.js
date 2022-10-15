import React from "react";
import TableHeader from "../../components/TableHeader";

const StatusHeader = ({totalValue}) => {
  return (
    <TableHeader
      title="Storage status"
      subTitle={`${totalValue} PLN`}
      noButton={true}
      // actionScope="inbound"
      // actionId={null}
    />
  )
}

export default StatusHeader