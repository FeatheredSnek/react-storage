import React from "react"
import { useSelector } from "react-redux"
import { statusSelector, totalValueSelector } from "./statusSelectors"

import StatusHeader from "./StatusHeader"
import StatusTable from "./StatusTable"

const StatusPage = () => {
  const tableData = useSelector(statusSelector)
  const totalValue = useSelector(totalValueSelector)

  return (
    <>
      <StatusHeader totalValue={totalValue}/>
      <StatusTable tableData={tableData}/>
    </>
  )
}

export default StatusPage
