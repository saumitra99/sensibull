import { all } from "redux-saga/effects";
import watchStocksInstrumentRequest from "../containers/StockPage/saga";

export default function* rootSaga() {
  yield all([watchStocksInstrumentRequest()]);
}
