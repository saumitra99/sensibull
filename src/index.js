import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SensibullApp from "./Routes";
import wfStore from "./store/configureStore";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={wfStore}>
    <BrowserRouter basename="/">
      <SensibullApp />
    </BrowserRouter>
  </Provider>
);
