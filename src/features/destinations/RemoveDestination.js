import React, { useState } from "react"
import { Dropdown, Menu, Button, Modal, Space } from "antd"
import { WarningOutlined, EllipsisOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { destinationRemoved } from "./destinationsSlice"

const RemoveDestination = ({ destinationId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const confirmCascadeDelete = () => {
    console.log(`deleting destination id ${destinationId}`)
    dispatch(destinationRemoved(destinationId))
    closeModal()
    navigate('/')
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span onClick={openModal}>Remove destination</span>
        }
      ]}
    />
  )

  const deleteModalTitle = () => {
    return (
      <Space>
        <WarningOutlined style={{ color: "red" }} />
        <strong>Confirm deleting destination</strong>
      </Space>
    )
  }

  return (
    <>
      <Modal
        title={deleteModalTitle()}
        open={isModalOpen}
        onOk={confirmCascadeDelete}
        onCancel={closeModal}
      >
        <p>
          Removing this destination will result in deleting all associated
          outbound records. The items will be returned to the inbound stock. Do
          you want to proceed?
        </p>
      </Modal>

      <Dropdown overlay={menu}>
        <Button>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default RemoveDestination
