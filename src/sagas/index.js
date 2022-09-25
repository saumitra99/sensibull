import { all } from "redux-saga/effects";
import watchStocksInstrumentRequest from "../containers/StockPage/saga";
import watchQuotesRequest from "../containers/QuotesPage/saga";

export default function* rootSaga() {
  yield all([watchStocksInstrumentRequest(), watchQuotesRequest()]);
}
