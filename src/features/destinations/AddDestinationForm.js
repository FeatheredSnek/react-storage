import React from "react"
import { useDispatch } from "react-redux"
import { Modal, Form, Input } from "antd"
import { destinationAdded } from "./destinationsSlice"

// uid will be done server side
import { nanoid } from "@reduxjs/toolkit"

import notifications from "../../components/notifications"
import { useNavigate } from "react-router-dom"

const AddDestinationForm = ({ open, modalCloseHandler }) => {
  const [destinationForm] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = () => {
    destinationForm
      .validateFields()
      .then((values) => {
        const name = values.name
        const id = nanoid()
        dispatch(destinationAdded({id, name}))
        notifications.success("Destination created")
        navigate(`/outbounds/${id}`)
        modalCloseHandler()
      })
      .catch((err) => console.warn(err))
  }

  const handleCancel = () => {
    modalCloseHandler()
  }

  return (
    <Modal
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title="Add destination"
      destroyOnClose
    >
      <Form
        form={destinationForm}
        layout="vertical"
        colon={false}
        requiredMark={false}
        preserve={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a proper name!"
            }
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddDestinationForm
