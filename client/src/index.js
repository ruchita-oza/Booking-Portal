import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import { positions, transitions, Provider as AlertProvider } from "react-alert";

import AlertTemplate from "react-alert-template-basic";
import { Toaster } from "react-hot-toast";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Toaster position="top-center" gutter={10} />
      <App />
    </AlertProvider>
  </Provider>
);