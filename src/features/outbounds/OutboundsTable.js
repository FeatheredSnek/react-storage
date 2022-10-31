import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { outboundRemoveRequested } from "./outboundsSlice"
import { Table, Button } from "antd"

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
    title: "Avg. price per unit",
    dataIndex: "itemAveragePrice",
    key: "itemAveragePrice",
    render: (data) =>
      data.toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN"
      })
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
  const [deletedId, setDeletedId] = useState(null)

  const dispatch = useDispatch()

  const loaderStatus = useSelector((state) => state.outbounds.status)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (id) => {
    setFormItemId(id)
    setIsModalOpen(true)
  }

  const deleteHandler = (id) => {
    setDeletedId(id)
    dispatch(outboundRemoveRequested({ id }))
  }

  const columns = [
    ...staticCols,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record.key)}>
            Edit
          </Button>
          <Button
            style={{
              display: "inline-flex",
              "min-width": "100px"
            }}
            type="link"
            onClick={() => deleteHandler(record.key)}
            loading={record.key === deletedId && loaderStatus === "loading"}
          >
            Delete
          </Button>
        </>
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
