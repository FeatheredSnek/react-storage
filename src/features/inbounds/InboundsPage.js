import React from "react"
import { useSelector } from "react-redux"
import { selectAllInbounds } from "./inboundsSlice"

import TableHeader from "../../components/TableHeader"
import InboundsTable from "./InboundsTable"

const InboundsPage = () => {
  const tableData = useSelector(selectAllInbounds)
  const totalValue = tableData
    .reduce((previous, current) => {
      return previous + current.price * current.units
    }, 0)

  return (
    <>
      <TableHeader
        title="Inbounds"
        subTitle={`Total value: ${totalValue.toLocaleString("pl-PL", {
          style: "currency",
          currency: "PLN"
        })}`}
        actionScope="inbound"
        actionId={null}
      />
      <InboundsTable tableData={tableData} />
    </>
  )
}

export default InboundsPage
