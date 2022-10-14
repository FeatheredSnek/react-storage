import React, {useState} from "react";
import { Table, Space, Divider, Typography } from "antd";

import mockdata from "../../mockdata";
import ModalForm from "../../components/ModalForm";

const staticCols = [    {
  title: 'Item',
  dataIndex: 'name',
  key: 'name'
},
{
  title: 'Inbound date',
  dataIndex: 'date',
  key: 'date',
},
{
  title: 'Price per unit',
  dataIndex: 'price',
  key: 'price',
},
{
  title: 'Quantity',
  dataIndex: 'units',
  key: 'units',
}]

const data = mockdata.inbounds.map(el => {
  const key = el.id
  const date = el.date
  const units = el.units
  const price = el.price
  const name = mockdata.items.find(i => i.id === el.item_id).name
  return {key, date, units, price, name}
})

const InboundsTable = ({editHandler}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formItemId, setFormItemId] = useState(null)
  
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (id) => {
    console.log(`passed in id ${id}`);
    setFormItemId(id)
    setIsModalOpen(true)
  }
      
  const deleteHandler = (id) => {
    console.log(`delete item with id ${id}`);
  }

  const columns = [
    ...staticCols,
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openModal(record.key)}>Edit</Typography.Link>
          <Typography.Link onClick={() => deleteHandler(record.key)}>Delete</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
    <ModalForm
            open={isModalOpen}
            modalCloseHandler={closeModal}
            actionType="edit"
            actionScope="inbound"
            actionId={formItemId}
            />
    <Table dataSource={data} columns={columns} pagination={false}></Table>
    </>
  )
}

export default InboundsTable