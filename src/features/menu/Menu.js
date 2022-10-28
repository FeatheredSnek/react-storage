import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
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
      label: el.name
    }
  })

  items.find((el) => el.key === "outbounds").children = menuOutboundsItems

  const location = useLocation()
  const highlightRoute = () => {
    const { pathname } = location
    switch (pathname) {
      case "/":
        console.log("path to home")
        return ["overview"]
      case "/status":
        console.log("path to staus")
        return ["status"]
      case "/inbounds":
        console.log("path to inbounds")
        return ["inbounds"]
      default:
        break
    }
  }

  return (
    <AntMenu
      mode="inline"
      selectedKeys={highlightRoute()}
      defaultOpenKeys={["outbounds"]}
      items={items}
      onClick={(item) => handleClick(item)}
    />
  )
}

export default Menu
