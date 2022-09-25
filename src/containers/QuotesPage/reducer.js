import QUOTES_CONSTANTS from "./constants";

const initialState = {
  quotesData: null,
  quotesLoading: true,
  quotesError: false,
};

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUOTES_CONSTANTS.QUOTES_REQUEST:
      return {
        ...state,
        quotesLoading: true,
      };
    case QUOTES_CONSTANTS.QUOTES_RECEIVE:
      return {
        ...state,
        quotesLoading: false,
        quotesData: action.data,
        quotesError: false,
      };
    case QUOTES_CONSTANTS.QUOTES_FAILURE:
      return {
        ...state,
        quotesLoading: false,
        quotesError: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default quotesReducer;
