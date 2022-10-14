import React from "react";
import { Table, Space, Divider, Typography } from "antd";

import mockdata from "../../mockdata";

const staticCols = [    {
  title: 'Item',
  dataIndex: 'name',
  key: 'name'
},
{
  title: 'Avg. price per unit',
  dataIndex: 'price',
  key: 'price',
},
{
  title: 'Inbound total',
  dataIndex: 'inbound',
  key: 'inbound',
},
{
  title: 'Outbound total',
  dataIndex: 'outbound',
  key: 'outbound',
},
{
  title: 'Current volume',
  dataIndex: 'current',
  key: 'current',
  render: (_, record) => {
    let current = record.inbound - record.outbound
    let type = ""
    if (current < 0) type = "danger"
    if (current === 0) type = "secondary"
    return <Typography.Text type={type}>{current}</Typography.Text>
  }
}

]

const data = mockdata.items.map(el => {
  const key = el.id
  // const name = mockdata.items.find(i => i.id === el.item_id).name
  const name = "Janusz"
  const price = 15
  return {key, price, name}
})

data[0].inbound = 30
data[0].outbound = 20
data[1].inbound = 50
data[1].outbound = 10
data[2].inbound = 15
data[2].outbound = 20

const StatusTable = ({editHandler}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [formItemId, setFormItemId] = useState(null)
  
  // const closeDetails = () => {
  //   setIsModalOpen(false)
  // }
  
  const openDetails = (id, type) => {
    console.log(`opened ${type} details modal for item ${id}`);
    // setIsModalOpen(true)
  }

  const columns = [
    ...staticCols,
    {
      title: 'Details',
      key: 'details',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link onClick={() => openDetails(record.key, 'inbound')}>Inbound</Typography.Link>
          <Typography.Link onClick={() => openDetails(record.key, 'outbound')}>Outbound</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <Table dataSource={data} columns={columns} pagination={false}></Table>
  )
}

export default StatusTable