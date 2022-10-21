import React, { useState } from "react"
import { Table, Space, Divider, Typography, Modal, Button } from "antd"
import StockChart from "./StockChart"
import PriceChart from "./PriceChart"

const staticCols = [
  {
    title: "Item",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Avg. price per unit",
    dataIndex: "price",
    key: "price",
    render: (data) => data.toFixed(2)
  },
  {
    title: "Inbound total",
    dataIndex: "inbound",
    key: "inbound"
  },
  {
    title: "Outbound total",
    dataIndex: "outbound",
    key: "outbound"
  },
  {
    title: "Current volume",
    dataIndex: "current",
    key: "current",
    render: (_, record) => {
      let current = record.inbound - record.outbound
      let type = ""
      if (current < 0) type = "danger"
      if (current === 0) type = "secondary"
      return <Typography.Text type={type}>{current}</Typography.Text>
    }
  }
]

const StatusTable = ({ tableData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chartType, setChartType] = useState("")
  const [chartItemId, setChartItemId] = useState(null)
  const [chartItemName, setChartItemName] = useState("")

  const openModal = (type, itemId, itemName) => {
    setChartType(type)
    setChartItemId(itemId)
    setChartItemName(itemName)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const columns = [
    ...staticCols,
    {
      title: "Trends",
      key: "trends",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => openModal("stock", record.key, record.name)}
          >
            Stock
          </Typography.Link>
          <Typography.Link
            onClick={() => openModal("price", record.key, record.name)}
          >
            Price
          </Typography.Link>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        dataSource={tableData.map((el) => {
          return { ...el, key: el.id }
        })}
        columns={columns}
        pagination={false}
      />
      {/* TODO modal/chart sizing */}
      <Modal
        open={isModalOpen}
        title={`${chartItemName} ${chartType} trend`}
        footer={
          <Button key="back" onClick={closeModal}>
            Return
          </Button>
        }
      >
        {chartType === "stock" ? (
          <StockChart itemId={chartItemId} />
        ) : (
          <PriceChart itemId={chartItemId} />
        )}
      </Modal>
    </>
  )
}

export default StatusTable
