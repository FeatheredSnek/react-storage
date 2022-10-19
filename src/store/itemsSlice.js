import { createSlice } from "@reduxjs/toolkit"
import { lastInboundRemoved } from "../features/inbounds/inboundsSlice"

const initialState = [
  {
    id: "item1",
    name: "Concrete"
  },
  {
    id: "item2",
    name: "Bricks"
  },
  {
    id: "item3",
    name: "Windows"
  }
]

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemAdded(state, action) {
      state.push(action.payload)
    },
    itemRemoved(state, action) {
      return state.filter((el) => el.id !== action.payload)
    }
  },
  extraReducers: builder => builder.addCase(lastInboundRemoved, (state, action) => {
    return state.filter((el) => el.id !== action.payload.itemId)
  })
})

export default itemsSlice.reducer

export const { itemAdded, itemRemoved } = itemsSlice.actions

export const getItemName = (state, itemId) =>
  state.items.find((item) => item.id === itemId).name

export const getItemAveragePrice = (state, itemId) => {
  const itemInbounds = state.inbounds.filter(
    (inbound) => inbound.item_id === itemId
  )
  return (
    itemInbounds.reduce((previous, current) => {
      return previous + current.price
    }, 0) / itemInbounds.length
  )
}

export const getAllItems = (state) => {
  return state.items.map(el => {
    return {
      ...el
    }
  })
}
