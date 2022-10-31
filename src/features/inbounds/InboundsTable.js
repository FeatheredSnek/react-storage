import React, { useState, useEffect } from "react"
import {
  Table,
  Space,
  Modal as DeleteModal,
  Button
} from "antd"
import InboundForm from "./InboundForm"
import {
  inboundRemoveRequested,
  lastInboundRemoveRequested
} from "./inboundsSlice"
import { useDispatch, useSelector } from "react-redux"
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

const lastOfKind = (data, id) => {
  const itemId = data.find((el) => el.id === id).item_id
  const otherRemaining = Boolean(
    data.find((el) => el.id !== id && el.item_id === itemId)
  )
  return !otherRemaining
}

const InboundsTable = ({ tableData }) => {
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [formItemId, setFormItemId] = useState(null)
  const [isEditedLastOfKind, setIsEditedLastOfKind] = useState(false)

  const closeModalForm = () => {
    setFormItemId(null)
    setIsEditedLastOfKind(false)
    setIsModalFormOpen(false)
  }

  const openModalForm = (id) => {
    console.log(lastOfKind(tableData, id))
    if (lastOfKind(tableData, id)) {
      setIsEditedLastOfKind(true)
    }
    setFormItemId(id)
    setIsModalFormOpen(true)
  }

  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletedInboundId, setDeletedInboundId] = useState(null)

  const loaderStatus = useSelector((state) => state.inbounds.status)

  const deleteHandler = (id) => {
    setDeletedInboundId(id)
    if (lastOfKind(tableData, id)) {
      setDeletedInboundId(id)
      setIsDeleteModalOpen(true)
      return
    }
    dispatch(inboundRemoveRequested({ id }))
  }

  const confirmCascadeDelete = () => {
    if (deletedInboundId === null) return
    const id = deletedInboundId
    const item_id = tableData.find((el) => el.id === id).item_id
    dispatch(lastInboundRemoveRequested({ id, item_id }))
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  useEffect(() => {
    if (loaderStatus === "success") {
      closeDeleteModal()
    }
  }, [loaderStatus])

  const deleteModalTitle = () => {
    return (
      <Space>
        <WarningOutlined style={{ color: "red" }} />
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
        <>
          <Button type="link" onClick={() => openModalForm(record.id)}>
            Edit
          </Button>
          <Button
            type="link"
            style={{
              display: "inline-flex",
              "min-width": "100px"
            }}
            onClick={() => deleteHandler(record.id)}
            loading={
              record.id === deletedInboundId && loaderStatus === "loading"
            }
          >
            Delete
          </Button>
        </>
      )
    }
  ]

  return (
    <>
      <InboundForm
        open={isModalFormOpen}
        modalCloseHandler={closeModalForm}
        actionType="edit"
        actionId={formItemId}
        disableItemEdit={isEditedLastOfKind}
      />
      <DeleteModal
        title={deleteModalTitle()}
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={
          <>
            <Button onClick={closeDeleteModal}>Cancel</Button>
            <Button
              onClick={() => confirmCascadeDelete(deletedInboundId)}
              loading={loaderStatus === "loading"}
              type="primary"
              danger
            >
              Confirm
            </Button>
          </>
        }
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
