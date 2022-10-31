import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Modal,
  Form,
  Input,
  AutoComplete,
  InputNumber,
  DatePicker,
  Tag,
  Tooltip,
  Button
} from "antd"
import {
  selectInbound,
  inboundAddRequested,
  inboundEditRequested
} from "./inboundsSlice"
import { getAllItems } from "../../store/itemsSlice"

import moment from "moment"
import "../../components/ModalForm.css"
import notifications from "../../components/notifications"

const InboundForm = ({
  open,
  modalCloseHandler,
  actionType,
  actionId,
  disableItemEdit
}) => {
  const editedItemData = useSelector((state) => selectInbound(state, actionId))
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

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const handleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen)
  }

  const itemLabel = () => {
    return (
      <div className="Form-item--label">
        {disableItemEdit ? (
          <Tooltip
            open={isTooltipOpen}
            placement="right"
            title="Last inbound of this kind, cannot edit"
          >
            <span>Item</span>
          </Tooltip>
        ) : (
          <span>Item</span>
        )}
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
      notifications.noChange() // ...notify that no data has been changed
      modalCloseHandler()
      return
    }

    form
      .validateFields()
      .then((values) => {
        // prepare payload
        const { price, units } = values
        const date =
          values.date instanceof moment
            ? values.date.format("YYYY-MM-DD")
            : values.date
        const payload = { price, units, date }
        if (isNewItem) {
          payload.name = values.itemName
        } else {
          payload.item_id = allItems.find((i) => i.name === values.itemName).id
        }

        if (actionType === "add") {
          dispatch(inboundAddRequested(payload))
        } else if (actionType === "edit") {
          payload.id = actionId
          dispatch(inboundEditRequested(payload))
        }
      })
      .catch((err) => console.warn(err))
  }

  const handleCancel = () => {
    setIsTooltipOpen(false)
    modalCloseHandler()
  }

  const loaderStatus = useSelector((state) => state.inbounds.status)

  useEffect(() => {
    if (loaderStatus === "success") {
      modalCloseHandler()
      setIsTooltipOpen(false)
    } else if (loaderStatus === "error") {
      modalCloseHandler()
      setIsTooltipOpen(false)
    }
  }, [loaderStatus, modalCloseHandler])

  const formTitle = () => {
    let title = actionType[0].toUpperCase() + actionType.slice(1) + " inbound"
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
      destroyOnClose
      mask={false}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title={formTitle()}
      footer={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            loading={loaderStatus === "loading"}
            type="primary"
          >
            Save
          </Button>
        </>
      }
    >
      <Form
        form={form}
        className={`Form-grid Form-grid--inbound`}
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
            onMouseEnter={handleTooltip}
            onMouseLeave={handleTooltip}
            disabled={disableItemEdit}
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

export default InboundForm
