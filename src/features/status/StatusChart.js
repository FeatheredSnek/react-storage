import React from "react"
import { useSelector } from "react-redux"
import Chart from "react-apexcharts"

const chartOptions = {
  chart: {
    id: "status-chart",
    animations: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 6
  },
  stroke: {
    curve: "straight"
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    type: "datetime"
  }
}

const StatusChart = ({ type, selector, itemId }) => {
  const data = useSelector((state) => selector(state, itemId))

  const chartSeries = [
    {
      name: type === "total" ? "Total stock" : "Price",
      data: data.map((el) => {
        return { x: el.date, y: el[type] }
      })
    }
  ]

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      height="350"
    />
  )
}

export default StatusChart
