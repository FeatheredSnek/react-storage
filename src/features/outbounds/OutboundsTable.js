import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { outboundRemoved } from "./outboundsSlice"
import { Table, Space, Divider, Typography } from "antd"

import OutboundForm from "./OutboundForm"

const staticCols = [
  {
    title: "Item",
    dataIndex: "itemName",
    key: "itemName"
  },
  {
    title: "Inbound date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "Price per unit (average)",
    dataIndex: "itemAveragePrice",
    key: "itemAveragePrice",
    render: (data) => data.toFixed(2)
  },
  {
    title: "Quantity",
    dataIndex: "units",
    key: "units"
  }
]

const OutboundsTable = ({ tableData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formItemId, setFormItemId] = useState(null)

  const dispatch = useDispatch()

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (id) => {
    console.log(`passed in id ${id}`)
    setFormItemId(id)
    setIsModalOpen(true)
  }

  const deleteHandler = (id) => {
    console.log(`delete item with id ${id}`)
    dispatch(outboundRemoved(id))
  }

  const columns = [
    ...staticCols,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openModal(record.key)}>
            Edit
          </Typography.Link>
          <Typography.Link onClick={() => deleteHandler(record.key)}>
            Delete
          </Typography.Link>
        </Space>
      )
    }
  ]

  return (
    <>
      <OutboundForm
        open={isModalOpen}
        modalCloseHandler={closeModal}
        actionType="edit"
        actionId={formItemId}
      />
      <Table
        dataSource={tableData.map((el) => {
          return { ...el, key: el.id }
        })}
        columns={columns}
        pagination={false}
      ></Table>
    </>
  )
}

export default OutboundsTable
