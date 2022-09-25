import STOCKS_CONSTANTS from "./constants";

const initialState = {
  stocksInstruments: null,
  stocksLoading: false,
  stocksError: false,
};

const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOCKS_CONSTANTS.STOCKS_INSTRUMENT_REQUEST:
      return {
        ...state,
        stocksLoading: true,
      };
    case STOCKS_CONSTANTS.STOCKS_INSTRUMENT_RECEIVE:
      return {
        ...state,
        stocksLoading: false,
        stocksInstruments: action.data,
        stocksError: true,
      };
    case STOCKS_CONSTANTS.STOCKS_INSTRUMENT_FAILURE:
      return {
        ...state,
        stocksLoading: false,
        stocksError: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default stocksReducer;
