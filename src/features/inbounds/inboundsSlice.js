import { createSlice } from "@reduxjs/toolkit"

import { getItemName } from "../../store/itemsSlice"

const inboundsSlice = createSlice({
  name: "inbounds",
  initialState: {
    data: [],
    status: "idle" // idle | loading | success | error
  },
  reducers: {
    // if thats a new item type it also needs to add item type
    // via items/itemAdded - and do it first so it has the proper item id
    inboundAdded(state, action) {
      console.log('payload in reducer');
      console.log(action.payload);
      state.data.push(action.payload)
      state.status = "success"
    },
    // need to check if any items of this inbound type are left
    // otherwise remove the item too via items/itemRemoved action
    inboundRemoved(state, action) {
      state.data = state.data.filter((el) => el.id !== action.payload.id)
      state.status = "success"
    },
    inboundEdited(state, action) {
      const index = state.data.findIndex((el) => el.id === action.payload.id)
      // with double spread the second spread's values overwrite duplicate keys
      state.data[index] = { ...state.data[index], ...action.payload }
      state.status = "success"
    },
    // related entries removal happens server side by sql constraints, so I can either
    // (1) do the cascade on the frontend - more state work via extra reducers, less requests
    // (2) do away with extra reducers and tell saga to request all related data on this action
    // current implementation is (1) simply because thats what static data prototype used ^_^
    lastInboundRemoved(state, action) {
      state.data = state.data.filter((el) => el.id !== action.payload.id)
      state.status = "success"
    },
    inboundsLoaded(state, action) {
      return { status: "idle", data: action.payload }
    },
    inboundAddRequested(state, action) {
      state.status = "loading"
    },
    inboundEditRequested(state, action) {
      state.status = "loading"
    },
    inboundRemoveRequested(state, action) {
      state.status = "loading"
    },
    lastInboundRemoveRequested(state, action) {
      state.status = "loading"
    },
    inboundStatusError(state) {
      state.status = "error"
    },
    inboundStatusReset(state) {
      state.status = "idle"
    }
  }
})

export default inboundsSlice.reducer

export const {
  inboundAdded,
  inboundRemoved,
  inboundEdited,
  lastInboundRemoved,
  inboundsLoaded,
  inboundAddRequested,
  inboundEditRequested,
  inboundRemoveRequested,
  lastInboundRemoveRequested,
  inboundStatusError,
  inboundStatusReset
} = inboundsSlice.actions

export const selectAllInbounds = (state) =>
  state.inbounds.data.map((inbound) => {
    return { ...inbound, itemName: getItemName(state, inbound.item_id) }
  })

export const selectInboundData = (state, inboundId) => {
  return { ...state.inbounds.data.find((el) => el.id === inboundId) }
}

export const selectInbound = (state, inboundId) => {
  const inbound = state.inbounds.data.find(
    (inbound) => inbound.id === inboundId
  )
  if (!inbound) return null
  return {
    ...inbound,
    itemName: getItemName(state, inbound.item_id)
  }
}

export const getInboundsValue = (state) => {
  return state.inbounds.data.reduce((previous, current) => {
    return previous + current.units * current.price
  }, 0)
}
