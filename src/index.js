import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CryptoProvider from "./context/cypto-context";

ReactDOM.render(
  <BrowserRouter>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
