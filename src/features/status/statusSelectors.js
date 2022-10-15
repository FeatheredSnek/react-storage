import { getItemAveragePrice } from "../../store/itemsSlice"

export const statusSelector = (state) => {
  let output = []
  for (let item of state.items) {
    const price = getItemAveragePrice(state, item.id)
    const inbound = state.inbounds
      .filter((inbound) => inbound.item_id === item.id)
      .reduce((previous, current) => {
        return previous + current.units
      }, 0)
    const outbound = state.outbounds
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

export const totalValueSelector = (state) => {
  return state.inbounds.reduce((previous, current) => {
    return previous + current.units * current.price
  }, 0)
}
