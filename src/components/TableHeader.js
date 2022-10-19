import React, { useState } from "react"
import { PageHeader, Button } from "antd"
import OutboundForm from "../features/outbounds/OutboundForm"
import InboundForm from "../features/inbounds/InboundForm"

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
      {actionScope === "outbound" ? (
        <OutboundForm
          open={isModalOpen}
          modalCloseHandler={closeModal}
          actionType="add"
          actionId={actionId}
        />
      ) : (
        <InboundForm
          open={isModalOpen}
          modalCloseHandler={closeModal}
          actionType="add"
          actionId={actionId}
        />
      )}
    </>
  )
}

export default TableHeader
