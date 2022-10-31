import { createSlice } from "@reduxjs/toolkit"

import { getItemName, getItemAveragePrice } from "../../store/itemsSlice"
import { lastInboundRemoved } from "../inbounds/inboundsSlice"
import { destinationRemoved } from "../destinations/destinationsSlice"


const outboundsSlice = createSlice({
  name: "outbounds",
  initialState: {
    data: [],
    status: "idle" // idle | loading | success | error
  },
  reducers: {
    outboundAdded(state, action) {
      state.data.push(action.payload)
      state.status = "success"
    },
    outboundRemoved(state, action) {
      state.status = "success"
      state.data = state.data.filter((el) => el.id !== action.payload.id)
    },
    outboundEdited(state, action) {
      const index = state.data.findIndex(
        (el) => el.id === action.payload.id
      )
      state.data[index] = { ...state.data[index], ...action.payload }
      state.status = "success"
    },
    outboundsLoaded(state, action) {
      state.data = action.payload
    },
    outboundRemoveRequested(state, action) {
      state.status = "loading"
    },
    outboundAddRequested(state, action) {
      state.status = "loading"
    },
    outboundEditRequested(state, action) {
      state.status = "loading"
    },
    outboundStatusError(state) {
      state.status = "error"
    },
    outboundStatusReset(state) {
      state.status = "idle"
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(lastInboundRemoved, (state, action) => {
        state.data = state.data.filter((el) => el.item_id !== action.payload.item_id)
      })
      .addCase(destinationRemoved, (state, action) => {
        state.data = state.data.filter((el) => el.destination !== action.payload.id)
      })
})

export default outboundsSlice.reducer

export const {
  outboundAdded,
  outboundRemoved,
  outboundEdited,
  outboundsLoaded,
  outboundRemoveRequested,
  outboundAddRequested,
  outboundEditRequested,
  outboundStatusError,
  outboundStatusReset
} = outboundsSlice.actions

export const selectOutboundsByDestinationId = (state, destinationId) => {
  const filtered = state.outbounds.data.filter(
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
  const outbound = state.outbounds.data.find(
    (outbound) => outbound.id === outboundId
  )
  if (!outbound) return null
  return {
    ...outbound,
    itemName: getItemName(state, outbound.item_id)
  }
}

export const selectAllOutbounds = (state) => state.outbounds.data

export const getOutboundValues = (state) => {
  return state.destinations.data.map((destination) => {
    const value = state.outbounds.data.reduce((previous, current) => {
      if (current.destination === destination.id) {
        return (
          previous + getItemAveragePrice(state, current.item_id) * current.units
        )
      } else {
        return previous + 0
      }
    }, 0)
    const name = destination.name
    const id = destination.id
    return { id, name, value }
  })
}
