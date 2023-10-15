import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import './fonts/Gilroy/Gilroy-Semibold.ttf';
import './fonts/Gilroy/Gilroy-Medium.ttf';
import './fonts/Gilroy/Gilroy-Bold.ttf';
import './fonts/Nunito/NunitoSans-Regular.ttf';
import './fonts/Nunito/NunitoSans-Bold.ttf';
import './fonts/Nunito/NunitoSans-BoldItalic.ttf';
import './fonts/Nunito/NunitoSans-SemiBold.ttf';
import store from '../src/Store/Store'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
