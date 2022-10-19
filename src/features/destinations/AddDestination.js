import React, { useState } from "react"
import { Button } from "antd"
import AddDestinationForm from "./AddDestinationForm"

const AddDestination = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <AddDestinationForm open={isModalOpen} modalCloseHandler={closeModal} />
      <Button onClick={handleClick} style={{width: "100%"}}>Add destination</Button>
    </>
  )
}

export default AddDestination
