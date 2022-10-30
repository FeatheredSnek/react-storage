import { getItemAveragePrice } from "../../store/itemsSlice"
import moment from "moment"

export const statusSelector = (state) => {
  let output = []
  for (let item of state.items) {
    const price = getItemAveragePrice(state, item.id)
    const inbound = state.inbounds
      .filter((inbound) => inbound.item_id === item.id)
      .reduce((previous, current) => {
        return previous + current.units
      }, 0)
    const outbound = state.outbounds.data
      .filter((outbound) => outbound.item_id === item.id)
      .reduce((previous, current) => {
        return previous + current.units
      }, 0)
    output.push({
      ...item,
      price,
      inbound,
      outbound
    })
  }
  return output
}

// wrong, thats only inbounds value
export const getTotalValue = (state) => {
  return state.inbounds.reduce((previous, current) => {
    return previous + current.units * current.price
  }, 0)
}

export const getStockByItemId = (state, itemId) => {
  // combine inbounds and outbounds for a particular item into 1 simplified array
  let records = state.inbounds
    .filter((el) => el.item_id === itemId)
    .concat(state.outbounds.data.filter((el) => el.item_id === itemId))
    .map((el) => {
      return {
        date: moment(el.date).valueOf(),
        units: el.price ? el.units : el.units * -1
        // if theres price its an inbound, if not its an outbound - so subtract
      }
    })
    .sort((a, b) => a.date - b.date)

  let lastSum = 0
  let results = []

  // go through records and update the sum accordingly
  // the array is already sorted by timestamps so that takes care of chronology
  // return (push) a date + sum pair if all records for this date were summed
  for (let i = 0; i < records.length; i++) {
    const previous = records[i - 1]
    const record = records[i]
    if (previous && record.date > previous.date) {
      results.push({ date: previous.date, total: lastSum })
    }
    lastSum += record.units
    if (i === records.length - 1)
      results.push({ date: record.date, total: lastSum })
  }

  return results
}

export const getPriceSeries = (state, itemId) => {
  let records = state.inbounds
    .filter((el) => el.item_id === itemId)
    .map((el) => {
      return {
        date: moment(el.date).valueOf(),
        price: el.price
      }
    })
    .sort((a, b) => a.date - b.date)

  return records
}

export const getCurrentStocks = (state) => {
  let records = state.inbounds.concat(state.outbounds.data)
  return state.items.map((item) => {
    const stock = records.reduce((previous, current) => {
      if (current.item_id === item.id) {
        if (current.price) return previous + current.units
        if (current.destination) return previous - current.units
      }
      return previous + 0
    }, 0)
    return {
      name: item.name,
      id: item.id,
      stock
    }
  })
}
