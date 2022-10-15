import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Table, Space, Divider, Typography } from "antd"
import { selectAllInbounds } from "./inboundsSlice"
import ModalForm from "../../components/ModalForm"

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
    title: "Price per unit",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Quantity",
    dataIndex: "units",
    key: "units"
  }
]

const InboundsTable = ({ editHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formItemId, setFormItemId] = useState(null)

  const tableData = useSelector(selectAllInbounds)

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
  }

  const columns = [
    ...staticCols,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openModal(record.id)}>
            Edit
          </Typography.Link>
          <Typography.Link onClick={() => deleteHandler(record.id)}>
            Delete
          </Typography.Link>
        </Space>
      )
    }
  ]

  return (
    <>
      <ModalForm
        open={isModalOpen}
        modalCloseHandler={closeModal}
        actionType="edit"
        actionScope="inbound"
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

export default InboundsTable
