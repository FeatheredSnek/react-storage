import React from "react"
import { Layout, Button, Space } from "antd"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "antd/dist/antd.min.css"
import "./index.css"
import "./App.css"

import Menu from "./features/menu/Menu"

import InboundsPage from "./features/inbounds/InboundsPage"
import OutboundsPage from "./features/outbounds/OutboundsPage"
import OverviewPage from "./features/overview/OverviewPage"
import StatusPage from "./features/status/StatusPage"
import ErrorPage from "./components/ErrorPage"
import AddDestination from "./features/destinations/AddDestination"
import TheNotificator from "./components/TheNotificator"

const { Content, Sider } = Layout

const App = () => {
  return (
    <BrowserRouter>
      <TheNotificator/>
      <Layout>
        <Sider
          className="Sider Sider--sticky"
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="Sider-head"></div>
          <Menu />
          <Space direction="vertical" className="Sider-buttons">
            <AddDestination/>
            <Button className="Sider-button">Logout</Button>
          </Space>
        </Sider>
        <Layout>
          <Content className="Content">
            <Routes>
              <Route path="/" element={<OverviewPage/>}/>
              <Route path="/status" element={<StatusPage/>}/>
              <Route path="/inbounds" element={<InboundsPage/>}/>
              <Route path="/outbounds/:destinationId" element={<OutboundsPage/>}/>
              <Route path="*" element={<ErrorPage type="404"/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default App
