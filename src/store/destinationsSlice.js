import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    id: "d1",
    label: "Skyscraper"
  },
  {
    id: "d2",
    label: "Hospital building"
  }
]

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    destinationAdded(state, action) {
      state.push(action.payload)
    },
    // dangerous - prompt before - has to cascaded remove all outbounds directed
    // to this destination id
    destinationRemoved(state, action) {
      state.filter((el) => el.id !== action.payload)
    }
  }
})

export const { destinationAdded, destinationRemoved } =
  destinationsSlice.actions

export default destinationsSlice.reducer
