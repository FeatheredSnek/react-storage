import React from "react"
import { useNavigate } from "react-router-dom"
import {
  HomeOutlined,
  AppstoreOutlined,
  ImportOutlined,
  ExportOutlined
} from "@ant-design/icons"
import { Menu as AntMenu } from "antd"

import mockdata from "../../mockdata"

const Menu = () => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.key === "overview") {
      navigate("/")
    }
    else if (item.keyPath.length === 1) {
      navigate(`/${item.key}`)
    }
    else if (item.keyPath.includes("outbounds")) {
      navigate(`/outbounds/${item.key}`)
    }
  }

  const items = [
    {
      key: "overview",
      icon: <HomeOutlined />,
      label: "Overview"
    },
    {
      key: "status",
      icon: <AppstoreOutlined />,
      label: "Status"
    },
    {
      key: "inbounds",
      icon: <ImportOutlined />,
      label: "Inbounds"
    },
    {
      key: "outbounds",
      icon: <ExportOutlined />,
      label: "Outbounds",
      children: [
        // {
        //   key: "1",
        //   label: "Skyscraper 7"
        // },
        // {
        //   key: "2",
        //   label: "St. Jude"
        // }
      ]
    }
  ]

  const menuOutboundsItems = mockdata.destinations.map(el => {
    return {
      key: el.id,
      label: el.label
    }
  })
  items[3].children = menuOutboundsItems

  return (
    <AntMenu
      mode="inline"
      defaultOpenKeys={["outbounds"]}
      items={items}
      onClick={(item) => handleClick(item)}
    />
  )
}

export default Menu
