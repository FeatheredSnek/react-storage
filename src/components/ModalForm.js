import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Modal,
  Form,
  Input,
  AutoComplete,
  InputNumber,
  DatePicker,
  Tag
} from "antd"
import {
  selectInbound,
  inboundAdded,
  inboundEdited
} from "../features/inbounds/inboundsSlice"
import {
  selectOutbound,
  outboundAdded,
  outboundEdited
} from "../features/outbounds/outboundsSlice"
import { itemAdded, getAllItems } from "../store/itemsSlice"

// temporary, uid generation will ultimately occur server-side
import { nanoid } from "@reduxjs/toolkit"

import moment from "moment"
import "./ModalForm.css"

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

  const dispatch = useDispatch()

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
    // if no form field was touched close form and...
    const fieldNames = ["itemName", "price", "units", "date"]
    const touched = fieldNames.map((e) => form.isFieldTouched(e))
    if (!touched.includes(true)) {
      console.log('no changes');// ...notify that no data has been changed
      modalCloseHandler()
      return
    }

    form
      .validateFields()
      .then((values) => {
        if (isNewItem) {
          // is this the creative var usage that the guy at medium wrote about?
          var itemPayload = {
            id: nanoid(),
            name: values.itemName
          }
          dispatch(itemAdded(itemPayload))
        }

        const id = nanoid()
        const item_id = isNewItem
          ? itemPayload.id
          : allItems.find((i) => i.name === values.itemName).id
        const date =
          values.date instanceof moment
            ? values.date.format("YYYY-MM-DD")
            : values.date
        const created_at = new Date().toISOString()
        const { price, units } = values
        const destination = actionId

        if (actionType === "add") {
          if (actionScope === "inbound") {
            dispatch(
              inboundAdded({ id, item_id, date, created_at, price, units })
            )
          } else if (actionScope === "outbound") {
            dispatch(
              outboundAdded({
                id,
                item_id,
                date,
                created_at,
                units,
                destination
              })
            )
          }
        } else if (actionType === "edit") {
          if (actionScope === "inbound") {
            dispatch(
              inboundEdited({ editedId: actionId, item_id, date, units, price })
            )
          } else if (actionScope === "outbound") {
            dispatch(
              outboundEdited({ editedId: actionId, item_id, date, units })
            )
          }
        }
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
    if (field.name[0] !== "itemName") return
    if (field.touched && !allItems.find((item) => item.name === field.value)) {
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
