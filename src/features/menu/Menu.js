import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  HomeOutlined,
  AppstoreOutlined,
  ImportOutlined,
  LogoutOutlined
} from "@ant-design/icons"
import { Menu as AntMenu } from "antd"

const Menu = () => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.key === "overview") {
      navigate("/")
    } else if (item.keyPath.length === 1) {
      navigate(`/${item.key}`)
    } else if (item.keyPath.includes("outbounds")) {
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
      icon: <LogoutOutlined />,
      label: "Outbounds",
      children: []
    }
  ]

  const destinations = useSelector((state) => state.destinations)

  const menuOutboundsItems = destinations.map((el) => {
    return {
      key: el.id,
      label: el.label
    }
  })

  items.find((el) => el.key === "outbounds").children = menuOutboundsItems

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
