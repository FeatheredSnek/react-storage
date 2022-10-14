import React from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage";
import OutboundsTable from "./OutboundsTable";
import OutboundsHeader from "./OutboundsHeader";

import mockdata from "../../mockdata";

const OutboundsPage = () => {
  const { destinationId } = useParams()
  const destinationData = mockdata.destinations.find(e => e.id === destinationId)
  
  if (destinationData === undefined) {
    return <ErrorPage type="404"/>
  }

  const destinationName = destinationData.label

  const data = mockdata.outbounds
    .filter(el => el.destination === destinationId)
    .map(el => {
      const key = el.id
      const date = el.date
      const units = el.units
      const price = "to be computed"
      const name = mockdata.items.find(i => i.id === el.item_id).name
      return {key, date, units, price, name}
    })

  return (
    <>
      <OutboundsHeader destinationName={destinationName} destinationId={destinationId}/>
      <OutboundsTable tableData={data}/>
    </>
  )
}

export default OutboundsPage
