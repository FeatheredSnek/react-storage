import { configureStore } from "@reduxjs/toolkit"

import inboundsReducer from "../features/inbounds/inboundsSlice"
import outboundsReducer from "../features/outbounds/outboundsSlice"
import destinationsReducer from "../features/destinations/destinationsSlice"
import itemsReducer from "./itemsSlice"

export default configureStore({
  reducer: {
    inbounds: inboundsReducer,
    outbounds: outboundsReducer,
    destinations: destinationsReducer,
    items: itemsReducer
  }
})
