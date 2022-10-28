import { takeEvery, put, call, all, race } from "redux-saga/effects";
import api from "../api";

import { itemsLoaded } from "./itemsSlice";
import { destinationsLoaded } from "../features/destinations/destinationsSlice";
import { inboundsLoaded } from "../features/inbounds/inboundsSlice";
import { outboundsLoaded } from "../features/outbounds/outboundsSlice";
import { loadingSuccess, loadingError } from "./loaderSlice";


function* fetchDataWorker() {
  try {
    const { data, timeout } = yield race({
      data: call(api.get, process.env.REACT_APP_API_GET_ALL),
      timeout: call(api.wait)
    }) 
    
    if (timeout) throw new Error(timeout)

    // according to saga github prs all batches actions 
    // so in principle the order of puts should not matter
    yield all([
      put(itemsLoaded(data.items)),
      put(destinationsLoaded(data.destinations)),
      put(inboundsLoaded(data.inbounds)),
      put(outboundsLoaded(data.outbounds)),
      put(loadingSuccess())
    ])
  }
  catch (error) {
    console.log(error);
    yield put(loadingError())
  }
}


function* loaderSaga() {
  yield takeEvery('loader/loadingStarted', fetchDataWorker)
}

export default loaderSaga
