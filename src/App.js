import React from "react"
import { Layout, Button } from "antd"
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

const { Content, Sider } = Layout

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Sider
          className="Sider Sider--sticky"
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className="Sider-head"></div>
          <Menu />
          <Button className="Sider-button">Logout</Button>
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
