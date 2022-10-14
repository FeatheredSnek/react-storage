import React, { useState } from "react"
import { PageHeader, Button } from "antd"
import ModalForm from "./ModalForm"

const TableHeader = ({ title, subTitle, actionScope, actionId, noButton }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const button = () => {
    if (noButton === true) {
      return null
    }
    else {
      return (
        <Button type="primary" onClick={openModal}>
          Add {actionScope}
        </Button>
      )
    }
  }

  return (
    <>
    <PageHeader
      onBack={() => console.log("back")}
      title={title}
      subTitle={subTitle}
      extra={button()}
    />
    <ModalForm
        open={isModalOpen}
        modalCloseHandler={closeModal}
        actionType="add"
        actionScope={actionScope}
      />
    </>
  )
}

export default TableHeader
