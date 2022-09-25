import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import getQuotes from "../../api/QuotesApi";
import { quotesSuccess, quotesFailure } from "./actions";
import QUOTES_CONSTANTS from "./constants";

export function* handleQuotes(action) {
  try {
    const response = yield call(getQuotes, action.data); // API CALL
    yield put(quotesSuccess(response.data)); // DISPATCH ACTION
  } catch (error) {
    yield put(quotesFailure(error));
  }
}

export default function* watchQuotesRequest() {
  yield all([takeLatest(QUOTES_CONSTANTS.QUOTES_REQUEST, handleQuotes)]);
}
