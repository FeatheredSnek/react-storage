import React from "react"
import { Card, Col, Row, Typography, Space, PageHeader, Button } from "antd"
import ApexChart from "react-apexcharts"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import AddDestination from "../destinations/AddDestination"
import "./OverviewPage.css"

const { Text, Title } = Typography

const chart = {
  options: {
    noData: {text: "No items in storage", offsetY: -60},
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
  },
  series: [44, 55, 41, 17, 15],
  labels: ["A", "B", "C", "D", "E"]
}

const bars = {
  options: {
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
    noData: {text: "No outbound data"},
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
  },
  series: [
    {
      data: [
        {
          x: "category A",
          y: 2345
        },
        {
          x: "category B",
          y: 457
        },
        {
          x: "category C",
          y: 1361
        }
      ]
    }
  ]
}

const OverviewPage = () => {
  const navigate = useNavigate()
  const navigateToOutbound = () => navigate('status')
  return (
    <div className="OverviewPage-wrapper">
      <PageHeader
        ghost={false}
        title="Dashboard"
        extra={[
          <Link to="/status" key="3">
            <Button>Stock status</Button>
          </Link>,
          <Link to="/inbounds" key="2">
            <Button>Inbounds</Button>
          </Link>,
          <Button icon={<QuestionCircleOutlined />} key="1" type="primary" />
        ]}
      />

      <div className="OverviewPage-content" >
        <Row gutter={24} className="OverviewPage-row">
          <Col span={6} flex={1} className="OverviewPage-column">
            <Card title="Totals" className="OverviewPage-card" bordered={false}>
              <Space direction="vertical" size="large">
                <div>
                  <Text type="secondary">Total value</Text>
                  <Text className="OverviewPage-total">
                    12 356.78 PLN
                  </Text >
                </div>
                <div>
                  <Text type="secondary">Inbounds value</Text>
                  <Text className="OverviewPage-total">
                    23 456.99 PLN
                  </Text >
                </div>
                <div>
                  <Text type="secondary">Outbounds value</Text>
                  <Text className="OverviewPage-total">
                    14 567.83 PLN
                  </Text >
                </div>
              </Space>
            </Card>
          </Col>
          <Col span={9} flex={1} className="OverviewPage-column">
            <Card
              title="Current storage"
              className="OverviewPage-card"
              bordered={false}
            >
              <div className="OverviewPage-graph-container">
                <ApexChart
                  type="donut"
                  series={chart.series}
                  options={chart.options}
                  labels={chart.labels}
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
                  series={bars.series}
                  options={bars.options}
                  width="400"
                  className="OverviewPage-graph"
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card title={<div className="OverwievPage-outbounds-list-header"><span>Outbound destinations</span><AddDestination/></div>}>
              <Card.Grid className="OverviewPage-outbound" onClick={() => navigateToOutbound()}>
                <Title level={5}>Skyscraper</Title>
                <p><Text type="secondary">12 345.67 PLN</Text></p>
              </Card.Grid>
              <Card.Grid className="OverviewPage-outbound" onClick={() => navigateToOutbound()}>
                <Title level={5}>Hospital building</Title>
                <p><Text type="secondary">12 345.67 PLN</Text></p>
              </Card.Grid>
              <Card.Grid className="OverviewPage-outbound" onClick={() => navigateToOutbound()}>
                <Title level={5}>Office</Title>
                <p><Text type="secondary">12 345.67 PLN</Text></p>
              </Card.Grid>
              <Card.Grid className="OverviewPage-outbound" onClick={() => navigateToOutbound()}>
                <Title level={5}>Apartment building 3</Title>
                <p><Text type="secondary">12 345.67 PLN</Text></p>
              </Card.Grid>
              <Card.Grid className="OverviewPage-outbound" onClick={() => navigateToOutbound()}>
                <Title level={5}>Warehouse</Title>
                <p><Text type="secondary">12 345.67 PLN</Text></p>
              </Card.Grid>
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
