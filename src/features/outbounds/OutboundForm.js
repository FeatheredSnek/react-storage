import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Form, Button, InputNumber, DatePicker, Select } from "antd"
import {
  selectOutbound,
  outboundAddRequested,
  outboundEditRequested
} from "./outboundsSlice"
import { getAllItems } from "../../store/itemsSlice"

import moment from "moment"
import "../../components/ModalForm.css"

const { Option } = Select

const OutboundForm = ({ open, modalCloseHandler, actionType, actionId }) => {
  const editedItemData = useSelector((state) => selectOutbound(state, actionId))
  const allItems = useSelector(getAllItems)
  const loaderStatus = useSelector((state) => state.outbounds.status)

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (open) form.resetFields()
  }, [open, form, actionId])

  const initialValues = {
    item: editedItemData
      ? {
          value: editedItemData.id,
          label: allItems.find((i) => i.id === editedItemData.item_id).name
        }
      : { value: null, label: null },
    units: editedItemData ? editedItemData.units : "",
    date: editedItemData ? moment(editedItemData.date, "YYYY-MM-DD") : ""
  }

  const handleSubmit = () => {
    // if no form field was touched close form and...
    const fieldNames = ["item", "units", "date"]
    const touched = fieldNames.map((e) => form.isFieldTouched(e))
    if (!touched.includes(true)) {
      console.log("no changes") // ...notify that no data has been changed
      modalCloseHandler()
      return
    }

    form
      .validateFields()
      .then((values) => {
        console.log(values)
        const item_id = allItems.find((i) => i.id === values.item.value).id
        const date =
          values.date instanceof moment
            ? values.date.format("YYYY-MM-DD")
            : values.date
        const { units } = values
        const destination = actionId

        if (actionType === "add") {
          dispatch(
            outboundAddRequested({
              item_id,
              date,
              units,
              destination
            })
          )
        } else if (actionType === "edit") {
          dispatch(
            outboundEditRequested({ id: actionId, item_id, date, units })
          )
        }
      })
      .catch((err) => console.warn(err))
  }

  const handleCancel = () => {
    modalCloseHandler()
  }

  useEffect(() => {
    if (loaderStatus === "success") {
      modalCloseHandler()
    } else if (loaderStatus === "error") {
      modalCloseHandler()
    }
  }, [loaderStatus, modalCloseHandler])

  const formTitle = () => {
    let title = actionType[0].toUpperCase() + actionType.slice(1) + "outbound"
    if (actionType === "edit") title += ` #${actionId}`
    return <strong>{title}</strong>
  }

  const handleSelect = (value) => console.log(value)

  const options = () => {
    return allItems.map((item) => {
      return (
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      )
    })
  }

  return (
    <Modal
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
            type="primary"
            loading={loaderStatus === "loading"}
          >
            Save
          </Button>
        </>
      }
    >
      <Form
        form={form}
        className={"Form-grid Form-grid--outbound"}
        layout="vertical"
        colon={false}
        requiredMark={false}
        initialValues={initialValues}
        preserve={false}
      >
        <Form.Item
          className="Form-item"
          label="Item"
          name="item"
          rules={[
            {
              required: true,
              message: "Please choose the outbound item!"
            }
          ]}
        >
          <Select
            showSearch
            labelInValue
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={handleSelect}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {options()}
          </Select>
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

export default OutboundForm
