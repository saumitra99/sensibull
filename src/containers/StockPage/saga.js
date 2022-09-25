import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import getStocksInstruments from "../../api/StocksApi";
import { stocksInstrumentSuccess, stocksInstrumentFailure } from "./actions";
import STOCKS_CONSTANTS from "./constants";

export function* handleStocksInstrument(action) {
  try {
    const response = yield call(getStocksInstruments, action.data); // API CALL
    yield put(stocksInstrumentSuccess(response.data)); // DISPATCH ACTION
  } catch (error) {
    yield put(stocksInstrumentFailure(error));
  }
}

export default function* watchStocksInstrumentRequest() {
  yield all([
    takeLatest(
      STOCKS_CONSTANTS.STOCKS_INSTRUMENT_REQUEST,
      handleStocksInstrument
    ),
  ]);
}
