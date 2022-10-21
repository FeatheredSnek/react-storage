import React from "react"
import Chart from "react-apexcharts"
import { useSelector } from "react-redux"
import { getPriceSeries } from "./statusSelectors"

const chartOptions = {
  chart: {
    animations: {
        enabled: false,
    },
    id: "price",
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
  xaxis: {
    type: "datetime"
  }
}

const PriceChart = ({ itemId }) => {
  const priceData = useSelector((state) => getPriceSeries(state, itemId))

  const chartSeries = [
    {
      name: "Price",
      data: priceData.map((el) => {
        return { x: el.date, y: el.price }
      })
    }
  ]

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      width="500"
    />
  )
}

export default PriceChart
