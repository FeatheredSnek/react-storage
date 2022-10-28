import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"

import inboundsReducer from "../features/inbounds/inboundsSlice"
import outboundsReducer from "../features/outbounds/outboundsSlice"
import destinationsReducer from "../features/destinations/destinationsSlice"
import itemsReducer from "./itemsSlice"
import loaderReducer from "./loaderSlice"

import loaderSaga from "./sagas"

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    inbounds: inboundsReducer,
    outbounds: outboundsReducer,
    destinations: destinationsReducer,
    items: itemsReducer,
    loader: loaderReducer,
  },
  middleware: [saga]
})
saga.run(loaderSaga)

export default store