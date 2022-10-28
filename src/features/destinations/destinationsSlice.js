import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  // {
  //   id: "d1",
  //   name: "Skyscraper"
  // },
  // {
  //   id: "d2",
  //   name: "Hospital building"
  // },
  // {
  //   id: "d3",
  //   name: "Small office"
  // }
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
      return state.filter((el) => el.id !== action.payload)
    },
    destinationsLoaded(state, action) {
      return state.concat(action.payload)
    }
  }
})

export default destinationsSlice.reducer

export const { destinationAdded, destinationRemoved, destinationsLoaded } =
  destinationsSlice.actions
