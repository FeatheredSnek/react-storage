import { createSlice } from "@reduxjs/toolkit"

import { getItemName, getItemAveragePrice } from "../../store/itemsSlice"

const initialState = [
  {
    id: "outbound1",
    created_at: "2022-10-01T12:55:31.000Z",
    item_id: "item1",
    units: 24,
    date: "2022-11-14",
    destination: "d1"
  },
  {
    id: "outbound2",
    created_at: "2022-10-01T12:55:44.000Z",
    item_id: "item2",
    units: 24,
    date: "2022-11-14",
    destination: "d1"
  },
  {
    id: "outbound3",
    created_at: "2022-10-01T12:56:06.000Z",
    item_id: "item2",
    units: 48,
    date: "2022-11-18",
    destination: "d2"
  },
  {
    id: "outbound4",
    created_at: "2022-10-01T12:56:17.000Z",
    item_id: "item1",
    units: 16,
    date: "2022-11-21",
    destination: "d2"
  },
  {
    id: "outbound5",
    created_at: "2022-10-01T12:56:25.000Z",
    item_id: "item2",
    units: 24,
    date: "2022-11-21",
    destination: "d2"
  },
  {
    id: "outbound6",
    created_at: "2022-10-01T12:56:36.000Z",
    item_id: "item2",
    units: 24,
    date: "2022-11-22",
    destination: "d1"
  },
  {
    id: "outbound7",
    created_at: "2022-10-01T12:56:41.000Z",
    item_id: "item1",
    units: 48,
    date: "2022-11-22",
    destination: "d1"
  }
]

const outboundsSlice = createSlice({
  name: "outbounds",
  initialState,
  reducers: {
    outboundAdded(state, action) {
      state.push(action.payload)
    },
    outboundRemoved(state, action) {
      state.filter((el) => el.id !== action.payload)
    }
  }
})

export default outboundsSlice.reducer

export const { outboundAdded, outboundRemoved } = outboundsSlice.actions

export const selectOutboundsByDestinationId = (state, destinationId) => {
  const filtered = state.outbounds.filter(
    (outbound) => outbound.destination === destinationId
  )
  const outbounds = filtered.map((outbound) => {
    const itemName = getItemName(state, outbound.item_id)
    const itemAveragePrice = getItemAveragePrice(
      state,
      outbound.item_id
    )
    return {
      ...outbound,
      itemName,
      itemAveragePrice
    }
  })
  return outbounds
}

export const selectOutbound = (state, outboundId) => {
  const outbound = state.outbounds.find((outbound) => outbound.id === outboundId)
  if (!outbound) return null
  return {
    ...outbound,
    itemName: getItemName(state, outbound.item_id)
  }
}