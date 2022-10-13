import React from "react"
import {
  Modal,
  Form,
  Input,
  AutoComplete,
  InputNumber,
  DatePicker,
  Tag
} from "antd"
import "./ModalForm.css"

import mockdata from "../mockdata"

const options = mockdata.items.map((el) => {
  return { value: el.name }
})
console.log(options)

const ModalForm = ({
  open,
  modalCloseHandler,
  actionType,
  actionScope,
  actionId
}) => {
  console.log(`modal form rendered with id ${actionId}`)
  const itemLabel = () => {
    return (
      <div className="Form-item--label">
        <span>Item</span>
        <Tag color="blue">New item type</Tag>
      </div>
    )
  }

  const handleSubmit = () => {
    console.log(`submitting a ${actionType}-${actionScope} form for id ${actionId}`)
    modalCloseHandler()
  }

  const handleCancel = () => {
    console.log("cancel")
    modalCloseHandler()
  }

  const formTitle = () => {
    let title =
      actionType[0].toUpperCase() + actionType.slice(1) + " " + actionScope
    if (actionType === "edit") title += ` #${actionId}`
    return <strong>{title}</strong>
  }

  return (
    <Modal
      mask={false}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title={formTitle()}
    >
      <Form
        className="Form-grid"
        layout="vertical"
        colon={false}
        requiredMark={false}
      >
        <Form.Item
          className="Form-item"
          label={itemLabel()}
          name="item"
          rules={[
            {
              required: true,
              message: "Please input item name!"
            }
          ]}
        >
          <AutoComplete
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input.Search className="Form-input" />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          className="Form-units"
          label="Quantity"
          name="units"
          rules={[
            {
              required: true,
              message: "Please input unit count!"
            }
          ]}
        >
          <InputNumber min={1} className="Form-input" />
        </Form.Item>
        <Form.Item
          className="Form-price"
          label="Price per unit"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price per unit!"
            }
          ]}
        >
          <InputNumber min={0.01} addonAfter="PLN" className="Form-input" />
        </Form.Item>
        <Form.Item
          className="Form-date"
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input inbound/outbound date!" // TODO dynamic in/out message
            }
          ]}
        >
          <DatePicker className="Form-input" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalForm
