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
    .toFixed(2)

  return (
    <>
      <TableHeader
        title="Inbounds"
        subTitle={`${totalValue} PLN`}
        actionScope="inbound"
        actionId={null}
      />
      <InboundsTable tableData={tableData} />
    </>
  )
}

export default InboundsPage
