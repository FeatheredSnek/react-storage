import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectOutboundsByDestinationId } from "./outboundsSlice"

import ErrorPage from "../../components/ErrorPage"
import OutboundsTable from "./OutboundsTable"
import OutboundsHeader from "./OutboundsHeader"


const OutboundsPage = () => {
  const { destinationId } = useParams()
  const destinationData = useSelector(state => state.destinations.find(el => el.id === destinationId))
  const tableData = useSelector(state =>
    selectOutboundsByDestinationId(state, destinationId)
  )
  const totalCost = tableData.reduce((previous, current) => {
      return previous + parseFloat(current.itemAveragePrice) * current.units
    }, 0).toFixed(2)

  if (destinationData === undefined) {
    return <ErrorPage type="404" />
  }

  const destinationName = destinationData.label

  return (
    <>
      <OutboundsHeader
        destinationName={destinationName}
        destinationId={destinationId}
        destinationTotalCost={totalCost}
      />
      <OutboundsTable tableData={tableData} />
    </>
  )
}

export default OutboundsPage
