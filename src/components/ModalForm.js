import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Modal,
  Form,
  Input,
  AutoComplete,
  InputNumber,
  DatePicker,
  Tag
} from "antd"
import { selectInbound } from "../features/inbounds/inboundsSlice"
import { getAllItems } from "../store/itemsSlice"
import moment from "moment"
import "./ModalForm.css"
import { selectOutbound } from "../features/outbounds/outboundsSlice"

const ModalForm = ({
  open,
  modalCloseHandler,
  actionType,
  actionScope,
  actionId
}) => {
  const editedItemData = useSelector((state) => {
    if (actionScope === "inbound") {
      return selectInbound(state, actionId)
    } else if (actionScope === "outbound") {
      return selectOutbound(state, actionId)
    } else return null
  })
  const allItems = useSelector(getAllItems)

  const [isNewItem, setIsNewItem] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) form.resetFields()
  }, [open, form, actionId])

  const options = allItems.map((el) => {
    return { value: el.name }
  })

  const itemLabel = () => {
    return (
      <div className="Form-item--label">
        <span>Item</span>
        {isNewItem ? <Tag color="blue">New item type</Tag> : ""}
      </div>
    )
  }

  const initialValues = {
    itemName: editedItemData ? editedItemData.itemName : "",
    price: editedItemData ? editedItemData.price : "",
    units: editedItemData ? editedItemData.units : "",
    date: editedItemData ? moment(editedItemData.date, "YYYY-MM-DD") : ""
  }

  const handleSubmit = () => {
    // preparation:
    // if there is an edited item data check if current values have changed
    // if not then just close the modal and notify that no data is changed
    // if yes, check if theres a new item
    form
      .validateFields()
      .then((values) => {
        let type = ''
        if (actionType === 'edit') {
          if (actionScope === 'inbound') {
            type = 'edit inbound record with ID ' + actionId
          }
          else if (actionScope === 'outbound') {
            type = 'edit outbound record with ID ' + actionId
          }
        }
        else if (actionType === 'add') {
          if (actionScope === 'inbound') {
            type = 'adding a record to inbounds table'
          }
          else if (actionScope === 'outbound') {
            type = 'adding a record to outbounds table with destination ID ' + actionId
          }
        }
        console.log(type);
        console.log(JSON.stringify(console.log(values)))
        modalCloseHandler()
      })
      .catch((err) => console.warn(err))
  }

  const handleCancel = () => {
    modalCloseHandler()
  }

  const formTitle = () => {
    let title =
      actionType[0].toUpperCase() + actionType.slice(1) + " " + actionScope
    if (actionType === "edit") title += ` #${actionId}`
    return <strong>{title}</strong>
  }

  const handleFieldChange = (field) => {
    if (
      field.name[0] === "itemName" &&
      field.touched &&
      !allItems.find((item) => item.name === field.value)
    ) {
      setIsNewItem(true)
    } else {
      setIsNewItem(false)
    }
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
        form={form}
        className={`Form-grid Form-grid--${actionScope}`}
        layout="vertical"
        colon={false}
        requiredMark={false}
        initialValues={initialValues}
        preserve={false}
        onFieldsChange={(field, _) => {
          handleFieldChange(field[0])
        }}
      >
        <Form.Item
          className="Form-item"
          label={itemLabel()}
          name="itemName"
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
        {actionScope === "inbound" ? (
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
        ) : (
          ""
        )}
        <Form.Item
          className="Form-date"
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input a valid date!"
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
