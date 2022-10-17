import React, { useState } from "react"
import { PageHeader, Button } from "antd"
import ModalForm from "./ModalForm"

const TableHeader = ({ title, subTitle, actionScope, actionId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <PageHeader
        onBack={() => console.log("back")}
        title={title}
        subTitle={subTitle}
        extra={
          <Button type="primary" onClick={openModal}>
            Add {actionScope}
          </Button>
        }
      />
      <ModalForm
        open={isModalOpen}
        modalCloseHandler={closeModal}
        actionType="add"
        actionId={actionId}
        actionScope={actionScope}
      />
    </>
  )
}

export default TableHeader
