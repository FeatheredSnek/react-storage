import { createSlice } from "@reduxjs/toolkit"

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: {
    data: [],
    status: "idle" // idle | loading | success | error
  },
  reducers: {
    destinationAdded(state, action) {
      state.data.push(action.payload)
      state.status = "success"
    },
    destinationRemoved(state, action) {
      state.data = state.data.filter((el) => el.id !== action.payload.id)
      state.status = "success"
    },
    destinationsLoaded(state, action) {
      return {
        ...state,
        data: action.payload
      }
    },
    destinationAddRequested(state, action) {
      state.status = "loading"
    },
    destinationRemoveRequested(state, action) {
      state.status = "loading"
    },
    destinationStatusError(state) {
      state.status = "error"
    },
    destinationStatusReset(state) {
      state.status = "idle"
    }
  }
})

export default destinationsSlice.reducer

export const {
  destinationAdded,
  destinationRemoved,
  destinationsLoaded,
  destinationAddRequested,
  destinationRemoveRequested,
  destinationStatusError,
  destinationStatusReset
} = destinationsSlice.actions
