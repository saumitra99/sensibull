/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === "production" ||
      !(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      ? applyMiddleware(sagaMiddleware)
      : compose(
          applyMiddleware(sagaMiddleware), // use logger
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

const wfStore = configureStore();
export default wfStore;
