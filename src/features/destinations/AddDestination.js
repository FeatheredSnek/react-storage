import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
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

  const loaderStatus = useSelector((state) => state.destinations.status)

  useEffect(() => {
    if (loaderStatus === "success") {
      closeModal()
    } else if (loaderStatus === "error") {
      closeModal()
    }
  }, [loaderStatus])

  return (
    <>
      <AddDestinationForm open={isModalOpen} modalCloseHandler={closeModal} />
      <Button onClick={handleClick} style={{width: "100%"}}>Add destination</Button>
    </>
  )
}

export default AddDestination
