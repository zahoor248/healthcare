import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./fonts/Gilroy/Gilroy-Semibold.ttf";
import "./fonts/Gilroy/Gilroy-Medium.ttf";
import "./fonts/Gilroy/Gilroy-Bold.ttf";
import "./fonts/Nunito/NunitoSans-Regular.ttf";
import "./fonts/Nunito/NunitoSans-Bold.ttf";
import "./fonts/Nunito/NunitoSans-BoldItalic.ttf";
import "./fonts/Nunito/NunitoSans-SemiBold.ttf";
import store from "../src/Store/Store";
import SignUp from "./Components/SignUp/SignUp";
import LogIn from "./Components/LogIn/LogIn";
import HiringLayout from "./Components/HiringLayout";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";
import Availability from "./Components/Availability/Availability";
import Layout from "./Components/Layout";
import Favouraties from "./Components/Favouraties/Favouraties";
import Contacts from "./Components/Contacts/Contacts";
import Reservations from "./Components/Reservations/Reservations";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import ReservationDetails from "./Components/Reservations/ReservationDetails";
import NewOffer from "./Components/Reservations/NewOffer";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/*global  layout  */}
        <Layout>
          {" "}
          {/* Wrap all routes with the Layout component */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/listings" element={<HiringLayout />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favouraties" element={<Favouraties />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route
              path="/reservation-detail"
              element={<ReservationDetails />}
            />
            <Route path="/counter-offer" element={<NewOffer />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
