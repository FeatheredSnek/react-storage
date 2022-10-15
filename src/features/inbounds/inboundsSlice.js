import { createSlice } from "@reduxjs/toolkit";

import { getItemName } from "../../store/itemsSlice";

const initialState = [
  {
    id: 'inbound1',
    created_at: "2022-10-01T12:50:45.000Z",
    item_id: 'item1',
    date: "2022-11-09",
    price: 18.0,
    units: 48
  },
  {
    id: 'inbound2',
    created_at: "2022-10-01T12:51:29.000Z",
    item_id: 'item2',
    date: "2022-11-09",
    price: 6.99,
    units: 48
  },
  {
    id: 'inbound3',
    created_at: "2022-10-01T12:52:13.000Z",
    item_id: 'item1',
    date: "2022-11-12",
    price: 19.5,
    units: 144
  },
  {
    id: 'inbound4',
    created_at: "2022-10-01T12:52:32.000Z",
    item_id: 'item1',
    date: "2022-11-13",
    price: 19.5,
    units: 48
  },
  {
    id: 'inbound5',
    created_at: "2022-10-01T12:52:46.000Z",
    item_id: 'item2',
    date: "2022-11-13",
    price: 6.99,
    units: 96
  },
  {
    id: 'inbound6',
    created_at: "2022-10-01T14:11:11.000Z",
    item_id: 'item3',
    date: "2022-11-20",
    price: 113.6,
    units: 12
  }
]

const inboundsSlice = createSlice({
  name: 'inbounds',
  initialState,
  reducers: {
    // if thats a new item type it also needs to add item type
    // via items/itemAdded - and do it first so it has the proper item id
    inboundAdded(state, action) {
      state.push(action.payload)
    },
    // need to check if any items of this inbound type are left
    // otherwise remove the item too via items/itemRemoved action
    inboundRemoved(state, action) {
      state.filter(el => el.id !== action.payload)
    }
  }
})

export default inboundsSlice

export const { inboundAdded, inboundRemoved } = inboundsSlice.actions

export const selectAllInbounds = state => state.inbounds
export const selectInboundData = (state, inboundId) => state.inbounds.find(el => el.id === inboundId)
export const selectInbound = (state, inboundId) => {
  const inbound = state.inbounds.find(inbound => inbound.id === inboundId)
  return {
    ...inbound,
    itemName: getItemName(state, inbound.item)
  }
}