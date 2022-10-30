import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, Input, Button } from "antd"
import { destinationAddRequested } from "./destinationsSlice"


const AddDestinationForm = ({ open, modalCloseHandler }) => {
  const [destinationForm] = Form.useForm()
  const dispatch = useDispatch()

  const loaderStatus = useSelector((state) => state.destinations.status)

  const handleSubmit = () => {
    destinationForm
      .validateFields()
      .then((values) => {
        dispatch(destinationAddRequested({ name: values.name }))
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
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loaderStatus === "loading"}
          onClick={handleSubmit}
        >
          Add destination
        </Button>
      ]}
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
