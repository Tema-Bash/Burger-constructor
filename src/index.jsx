import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; //обновить импорт
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./services/store/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
