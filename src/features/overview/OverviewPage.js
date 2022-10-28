import React from "react"
import {
  Card,
  Col,
  Row,
  Typography,
  Space,
  PageHeader,
  Button,
  Empty
} from "antd"
import ApexChart from "react-apexcharts"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import AddDestination from "../destinations/AddDestination"
import { getInboundsValue } from "../inbounds/inboundsSlice"
import "./OverviewPage.css"
import { useSelector } from "react-redux"
import { getOutboundValues } from "../outbounds/outboundsSlice"
import { getCurrentStocks } from "../status/statusSelectors"

// temporary
import { loadingStarted } from "../../store/loaderSlice"
import { useDispatch } from "react-redux"

const { Text, Title } = Typography

const barchartOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  plotOptions: {
    bar: {
      distributed: true
    }
  },
  dataLabels: {
    formatter: function (val, _) {
      return val.toLocaleString("pl-PL", { style: "currency", currency: "PLN" })
    }
  },
  noData: { text: "No outbound data" },
  responsive: [
    {
      breakpoint: 1450,
      options: {
        chart: {
          width: 350
        }
      }
    },
    {
      breakpoint: 1350,
      options: {
        chart: {
          width: 300
        }
      }
    },
    {
      breakpoint: 1250,
      options: {
        chart: {
          width: 250
        }
      }
    }
  ]
}

const piechartStaticOptions = {
  noData: { text: "No items in storage", offsetY: -60 },
  responsive: [
    {
      breakpoint: 1450,
      options: {
        chart: {
          width: 350
        },
        legend: {
          position: "right"
        }
      }
    },
    {
      breakpoint: 1280,
      options: {
        chart: {
          width: 250
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
}

const OverviewPage = () => {

  // temporary
  const dispatch = useDispatch()
  const loaderStatus = useSelector(state => state.loader.status)
  const handleTest = () => {
    dispatch(loadingStarted())
  }

  const currentStocks = useSelector(getCurrentStocks)
  const outboundValues = useSelector(getOutboundValues)
  const inboundsTotalValue = useSelector(getInboundsValue)
  const outboundsTotalValue = outboundValues.reduce((p, c) => {
    return p + c.value
  }, 0)
  const currentTotalValue = inboundsTotalValue - outboundsTotalValue

  const barchartSeries = [
    {
      name: "Estimated outbound value",
      data: outboundValues.map((el) => {
        return {
          x: el.name,
          y: el.value.toFixed(2)
        }
      })
    }
  ]

  const piechartSeries = currentStocks.map((el) => el.stock)
  const piechartLabels = currentStocks.map((el) => el.name)
  const piechartOptions = { ...piechartStaticOptions, labels: piechartLabels }

  const navigate = useNavigate()
  const navigateToOutbound = (id) => navigate(`/outbounds/${id}`)

  return (
    <div className="OverviewPage-wrapper">
      <PageHeader
        ghost={false}
        // temporary
        title={`Dashboard -- status: ${loaderStatus}`}
        extra={[
          <Link to="/status" key="3">
            <Button>Stock status</Button>
          </Link>,
          <Link to="/inbounds" key="2">
            <Button>Inbounds</Button>
          </Link>,
          <Button icon={<QuestionCircleOutlined />} key="1" type="primary" />,
          // temporary
          <Button key="69" onClick={handleTest}>Load data</Button>
        ]}
      />

      <div className="OverviewPage-content">
        <Row gutter={24} className="OverviewPage-row">
          <Col span={6} flex={1} className="OverviewPage-column">
            <Card title="Totals" className="OverviewPage-card" bordered={false}>
              <Space direction="vertical" size="large">
                <div>
                  <Text type="secondary">Inbounds total value</Text>
                  <Text className="OverviewPage-total">
                    {inboundsTotalValue.toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN"
                    })}
                  </Text>
                </div>
                <div>
                  <Text type="secondary">Outbounds estimated value</Text>
                  <Text className="OverviewPage-total">
                    {outboundsTotalValue.toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN"
                    })}
                  </Text>
                </div>
                <div>
                  <Text type="secondary">Stock estimated value</Text>
                  <Text className="OverviewPage-total">
                    {currentTotalValue.toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN"
                    })}
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>
          <Col span={9} flex={1} className="OverviewPage-column">
            <Card
              title="Current stocks"
              className="OverviewPage-card"
              bordered={false}
            >
              <div className="OverviewPage-graph-container">
                <ApexChart
                  type="donut"
                  options={piechartOptions}
                  series={piechartSeries}
                  width="400"
                  className="OverviewPage-graph"
                />
              </div>
            </Card>
          </Col>
          <Col span={9} flex={1} className="OverviewPage-column">
            <Card
              title="Outbounds value"
              className="OverviewPage-card"
              bordered={false}
            >
              <div className="OverviewPage-graph-container">
                <ApexChart
                  type="bar"
                  series={barchartSeries}
                  options={barchartOptions}
                  width="400"
                  className="OverviewPage-graph"
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              title={
                <div className="OverwievPage-outbounds-list-header">
                  <span>Outbound destinations</span>
                  <AddDestination />
                </div>
              }
            >
              {outboundValues.length === 0 ? (
                <Empty />
              ) : (
                outboundValues.map((outbound) => {
                  return (
                    <Card.Grid
                      key={outbound.id}
                      onClick={() => navigateToOutbound(outbound.id)}
                      className="OverviewPage-outbound"
                    >
                      <Title level={5}>{outbound.name}</Title>
                      <p>
                        <Text type="secondary">
                          {outbound.value.toLocaleString("pl-PL", {
                            style: "currency",
                            currency: "PLN"
                          })}
                        </Text>
                      </p>
                    </Card.Grid>
                  )
                })
              )}
            </Card>
          </Col>
        </Row>
      </div>
      <div className="OverviewPage-footer">
        ©2022 App Company - <Typography.Link>Report issue</Typography.Link>
      </div>
    </div>
  )
}

export default OverviewPage
