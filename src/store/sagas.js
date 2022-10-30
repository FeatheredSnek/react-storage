import { takeEvery, put, call, all, race, delay } from "redux-saga/effects"
import api from "../api"

import { itemsLoaded } from "./itemsSlice"
import { destinationsLoaded } from "../features/destinations/destinationsSlice"
import { inboundsLoaded } from "../features/inbounds/inboundsSlice"
import { outboundsLoaded } from "../features/outbounds/outboundsSlice"
import { loadingSuccess, loadingError } from "./loaderSlice"

import { destinationAdded, destinationRemoved, destinationStatusError, destinationStatusReset } from "../features/destinations/destinationsSlice"


function* fetchDataWorker() {
  try {
    const { data } = yield race({
      data: call(api.get, process.env.REACT_APP_API_GET_ALL),
      timeout: call(api.timeout)
    })

    // according to saga github prs all batches actions
    // so in principle the order of puts should not matter
    yield all([
      put(itemsLoaded(data.items)),
      put(destinationsLoaded(data.destinations)),
      put(inboundsLoaded(data.inbounds)),
      put(outboundsLoaded(data.outbounds)),
      put(loadingSuccess())
    ])

  } catch (error) {
    console.log(error)
    yield put(loadingError())
  }
}


function* loaderSaga() {
  yield takeEvery("loader/loadingStarted", fetchDataWorker)
}


function* addDestinationWorker(action) {
  console.log(action.payload)
  try {
    const { data, timeout } = yield race({
      data: call(
        api.add,
        process.env.REACT_APP_API_DESTINATIONS_ADD,
        action.payload
      ),
      timeout: call(api.timeout)
    })

    if (timeout) throw new Error(timeout)
    
    yield put(destinationAdded(data))
    yield delay(100)
    yield put(destinationStatusReset())

  } catch (error) {
    console.log(error)
    yield put(destinationStatusError())
    yield delay(100)
    yield put(destinationStatusReset())
  }
}


function* addDestinationSaga() {
  yield takeEvery("destinations/destinationAddRequested", addDestinationWorker)
}


function* removeDestinationWorker(action) {
  console.log(action.payload)
  try {
    const { data, timeout } = yield race({
      data: call(
        api.remove,
        process.env.REACT_APP_API_DESTINATIONS_DELETE,
        action.payload
      ),
      timeout: call(api.timeout)
    })

    if (timeout) throw new Error(timeout)
    
    yield put(destinationRemoved(data))
    yield delay(100)
    yield put(destinationStatusReset())

  } catch (error) {
    console.log(error)
    yield put(destinationStatusError())
    yield delay(100)
    yield put(destinationStatusReset())
  }
}


function* removeDestinationSaga() {
  yield takeEvery("destinations/destinationRemoveRequested", removeDestinationWorker)
}


function* rootSaga() {
  yield all([
    loaderSaga(), 
    addDestinationSaga(),
    removeDestinationSaga()
  ])
}

export default rootSaga
