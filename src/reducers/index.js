import { combineReducers } from "redux";
import stocksReducer from "../containers/StockPage/reducer";

const rootReducer = combineReducers({
  stocks: stocksReducer,
});

export default rootReducer;
