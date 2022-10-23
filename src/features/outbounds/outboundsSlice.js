import { createSlice } from "@reduxjs/toolkit"

import { getItemName, getItemAveragePrice } from "../../store/itemsSlice"
import { lastInboundRemoved } from "../inbounds/inboundsSlice"
import { destinationRemoved } from "../destinations/destinationsSlice"

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
    date: "2022-11-19",
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
  },
  {
    id: "outbound8",
    created_at: "2022-10-01T12:56:41.000Z",
    item_id: "item1",
    units: 15,
    date: "2022-11-12",
    destination: "d1"
  },
  {
    id: "outbound9",
    created_at: "2022-10-01T12:56:41.000Z",
    item_id: "item1",
    units: 71,
    date: "2022-11-22",
    destination: "d3"
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
      return state.filter((el) => el.id !== action.payload)
    },
    outboundEdited(state, action) {
      const index = state.findIndex((el) => el.id === action.payload.editedId)
      state[index] = { ...state[index], ...action.payload }
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(lastInboundRemoved, (state, action) => {
        return state.filter((el) => el.item_id !== action.payload.itemId)
      })
      .addCase(destinationRemoved, (state, action) => {
        return state.filter((el) => el.destination !== action.payload)
      })
})

export default outboundsSlice.reducer

export const { outboundAdded, outboundRemoved, outboundEdited } =
  outboundsSlice.actions

export const selectOutboundsByDestinationId = (state, destinationId) => {
  const filtered = state.outbounds.filter(
    (outbound) => outbound.destination === destinationId
  )
  const outbounds = filtered.map((outbound) => {
    const itemName = getItemName(state, outbound.item_id)
    const itemAveragePrice = getItemAveragePrice(state, outbound.item_id)
    return {
      ...outbound,
      itemName,
      itemAveragePrice
    }
  })
  return outbounds
}

export const selectOutbound = (state, outboundId) => {
  const outbound = state.outbounds.find(
    (outbound) => outbound.id === outboundId
  )
  if (!outbound) return null
  return {
    ...outbound,
    itemName: getItemName(state, outbound.item_id)
  }
}

export const selectAllOutbounds = (state) => state.outbounds

export const getOutboundValues = (state) => {
  return state.destinations.map((destination) => {
    const value = state.outbounds.reduce((previous, current) => {
      if (current.destination === destination.id) {
        return previous + getItemAveragePrice(state, current.item_id) * current.units
      } else {
        return previous + 0
      }
    }, 0)
    const name = destination.label
    const id = destination.id
    return { id, name, value }
  })
}
