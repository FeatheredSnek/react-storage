import React from "react"
import { useSelector } from "react-redux"
import { statusSelector, totalValueSelector } from "./statusSelectors"

import { PageHeader } from "antd"
import StatusTable from "./StatusTable"

const StatusPage = () => {
  const tableData = useSelector(statusSelector)
  const totalValue = useSelector(totalValueSelector)

  return (
    <>
      <PageHeader
        title="Storage status"
        subTitle={`${totalValue.toFixed()} PLN`}
      />
      <StatusTable tableData={tableData} />
    </>
  )
}

export default StatusPage
