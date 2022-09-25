import QUOTES_CONSTANTS from "./constants";

export const quotesRequest = (data) => ({
  type: QUOTES_CONSTANTS.QUOTES_REQUEST,
  data,
});

export const quotesSuccess = (data) => ({
  type: QUOTES_CONSTANTS.QUOTES_RECEIVE,
  data,
});

export const quotesFailure = (data) => ({
  type: QUOTES_CONSTANTS.QUOTES_FAILURE,
  data,
});
