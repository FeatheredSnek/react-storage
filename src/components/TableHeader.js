import React, { useState } from "react"
import { PageHeader, Button } from "antd"
import OutboundForm from "../features/outbounds/OutboundForm"
import InboundForm from "../features/inbounds/InboundForm"
import RemoveDestination from "../features/destinations/RemoveDestination"
import { useNavigate } from "react-router-dom"

const TableHeader = ({ title, subTitle, actionScope, actionId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const navigate = useNavigate()
  const navigateHome = () => navigate('/')

  return (
    <>
      <PageHeader
        onBack={navigateHome}
        title={title}
        subTitle={subTitle}
        extra={
          <>
            <Button type="primary" onClick={openModal}>
              Add {actionScope}
            </Button>
            {actionScope === "outbound" ? (
              <RemoveDestination
                destinationId={actionId}
                style={{ "margin-left": "16px" }}
              />
            ) : (
              ""
            )}
          </>
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
