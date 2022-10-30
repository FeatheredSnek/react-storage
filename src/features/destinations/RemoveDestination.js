import React, { useState } from "react"
import { Dropdown, Menu, Button, Modal, Space } from "antd"
import { WarningOutlined, EllipsisOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { destinationRemoveRequested } from "./destinationsSlice"

const RemoveDestination = ({ destinationId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const dispatch = useDispatch()

  const loaderStatus = useSelector((state) => state.destinations.status)

  const confirmCascadeDelete = () => {
    dispatch(destinationRemoveRequested({id: destinationId}))
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span onClick={openModal}>Remove destination-{loaderStatus}</span>
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
        onCancel={closeModal}
        footer={
          <Button loading={loaderStatus === 'loading'} onClick={confirmCascadeDelete}>
            Confirm
          </Button>
        }
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
