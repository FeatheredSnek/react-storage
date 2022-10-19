import React, { useState } from "react"
import { Table, Space, Divider, Typography, Modal as DeleteModal } from "antd"
import ModalForm from "../../components/ModalForm"
import { inboundRemoved, lastInboundRemoved } from "./inboundsSlice"
import { useDispatch } from "react-redux"
import { WarningOutlined } from "@ant-design/icons"

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
    key: "price",
    render: (data) => data.toFixed(2)
  },
  {
    title: "Quantity",
    dataIndex: "units",
    key: "units"
  }
]

const InboundsTable = ({ tableData }) => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [formItemId, setFormItemId] = useState(null)

  const closeModalForm = () => {
    setIsModalFormOpen(false)
  }

  const openModalForm = (id) => {
    console.log(`passed in id ${id}`)
    setFormItemId(id)
    setIsModalFormOpen(true)
  }

  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletedInboundId, setDeletedInboundId] = useState(null)

  const deleteHandler = (id) => {
    const itemId = tableData.find((el) => el.id === id).item_id
    const itemWillExist = tableData.find(
      (el) => el.id !== id && el.item_id === itemId
    )
    if (!itemWillExist) {
      setIsDeleteModalOpen(true)
      setDeletedInboundId(id)
      return
    }
    dispatch(inboundRemoved(id))
  }

  const confirmCascadeDelete = () => {
    if (deletedInboundId === null) return
    const id = deletedInboundId
    const itemId = tableData.find((el) => el.id === id).item_id
    dispatch(lastInboundRemoved({ id, itemId }))
    closeDeleteModal()
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const deleteModalTitle = () => {
    return (
      <Space>
        <WarningOutlined style={{color: 'red'}} />
        <strong>Confirm deleting inbound record #{deletedInboundId}</strong>
      </Space>
    )
  }

  const columns = [
    ...staticCols,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openModalForm(record.id)}>
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
        open={isModalFormOpen}
        modalCloseHandler={closeModalForm}
        actionType="edit"
        actionScope="inbound"
        actionId={formItemId}
      />
      <DeleteModal
        title={deleteModalTitle()}
        open={isDeleteModalOpen}
        onOk={() => confirmCascadeDelete(deletedInboundId)}
        onCancel={closeDeleteModal}
      >
        <p>This is the last remaining inbound record of this kind of item</p>
        <p>
          Removing this record will result in deleting the item info from the
          database along with all associated outbound records. Do you want to
          proceed?
        </p>
      </DeleteModal>
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
