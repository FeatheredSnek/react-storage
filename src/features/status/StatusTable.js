import React from "react"
import { Table, Space, Divider, Typography } from "antd"

const staticCols = [
  {
    title: "Item",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Avg. price per unit",
    dataIndex: "price",
    key: "price"
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

const StatusTable = ({ tableData, editHandler }) => {
  const openDetails = (id, type) => {
    console.log(`opened ${type} details modal for item ${id}`)
  }

  const columns = [
    ...staticCols,
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openDetails(record.key, "inbound")}>
            Inbound
          </Typography.Link>
          <Typography.Link onClick={() => openDetails(record.key, "outbound")}>
            Outbound
          </Typography.Link>
        </Space>
      )
    }
  ]

  return (
    <Table
      dataSource={tableData.map((el) => {
        return { ...el, key: el.id }
      })}
      columns={columns}
      pagination={false}
    ></Table>
  )
}

export default StatusTable
