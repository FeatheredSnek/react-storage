import React from "react"
import Chart from "react-apexcharts"
import { useSelector } from "react-redux"
import { getStockByItemId } from "./statusSelectors"

const chartOptions = {
  chart: {
    id: "total",
    toolbar: {
      show: false
    }
  },
  markers: {
    size: 1
  },
  stroke: {
    curve: "straight"
  },
  fill: {
    pattern: {
      style: "horizontalLines",
      width: 6,
      height: 6,
      strokeWidth: 2
    }
  },
  xaxis: {
    type: "datetime"
  }
}

// TODO different charts as hoc returning apex's Chart
const StockChart = ({ itemId }) => {
  const inboundData = useSelector((state) => getStockByItemId(state, itemId))

  const chartSeries = [
    {
      name: "Total units",
      data: inboundData.map((el) => {
        return { x: el.date, y: el.total }
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

export default StockChart
