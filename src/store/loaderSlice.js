import { createSlice } from "@reduxjs/toolkit"

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    status: "idle"
  }, // idle | loading | success | error
  reducers: {
    // s => 'xxx' ???
    loadingStarted(state) {
      state.status = "loading"
    },
    loadingSuccess(state) {
      state.status = "success"
    },
    loadingError(state) {
      state.status = "error"
    }
  }
})

export default loaderSlice.reducer
export const { loadingStarted, loadingSuccess, loadingError } =
  loaderSlice.actions
