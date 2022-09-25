import { combineReducers } from "redux";
import stocksReducer from "../containers/StockPage/reducer";
import quotesReducer from "../containers/QuotesPage/reducer";

const rootReducer = combineReducers({
  stocks: stocksReducer,
  quotes: quotesReducer,
});

export default rootReducer;
