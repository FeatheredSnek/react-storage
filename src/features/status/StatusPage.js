import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { statusSelector } from "./statusSelectors"

import { PageHeader } from "antd"
import StatusTable from "./StatusTable"

const StatusPage = () => {
  const tableData = useSelector(statusSelector)
  const totalValue = tableData.reduce((previous, current) => {
    return previous + current.price * (current.inbound - current.outbound)
  }, 0)

  const navigate = useNavigate()
  const navigateHome = () => navigate("/")

  return (
    <>
      <PageHeader
        title="Storage status"
        subTitle={`Estimated stock value: ${totalValue.toLocaleString("pl-PL", {
          style: "currency",
          currency: "PLN"
        })}`}
        onBack={navigateHome}
      />
      <StatusTable tableData={tableData} />
    </>
  )
}

export default StatusPage
