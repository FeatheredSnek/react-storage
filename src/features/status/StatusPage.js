import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { statusSelector, totalValueSelector } from "./statusSelectors"

import { PageHeader } from "antd"
import StatusTable from "./StatusTable"

const StatusPage = () => {
  const tableData = useSelector(statusSelector)
  const totalValue = useSelector(totalValueSelector)

  const navigate = useNavigate()
  const navigateHome = () => navigate('/')

  return (
    <>
      <PageHeader
        title="Storage status"
        subTitle={`${totalValue.toFixed(2)} PLN`}
        onBack={navigateHome}
      />
      <StatusTable tableData={tableData} />
    </>
  )
}

export default StatusPage
