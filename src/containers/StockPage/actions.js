import STOCKS_CONSTANTS from "./constants";

export const stocksInstrumentRequest = (data) => ({
  type: STOCKS_CONSTANTS.STOCKS_INSTRUMENT_REQUEST,
  data,
});

export const stocksInstrumentSuccess = (data) => ({
  type: STOCKS_CONSTANTS.STOCKS_INSTRUMENT_RECEIVE,
  data,
});

export const stocksInstrumentFailure = (data) => ({
  type: STOCKS_CONSTANTS.STOCKS_INSTRUMENT_FAILURE,
  data,
});
