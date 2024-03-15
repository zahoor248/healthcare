import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
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
import SignUp2 from "./Components/SignUp/Signup2";
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
import BusinessProfile from "./Components/ProfileDetails/BusinessProfile";
import ReservationDetails from "./Components/Reservations/ReservationDetails";
import NewOffer from "./Components/Reservations/NewOffer";

import ResetPassword from "./Components/PasswordReset/ResetPassword";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*global  layout  */}
      <HashRouter>
        <Layout>
          {" "}
          {/* Wrap all routes with the Layout component */}
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/register" element={<SignUp />} /> */}
            <Route path="/missinginfo" element={<SignUp2 />} />
            {/* <Route path="/login" element={<LogIn />} /> */}
            <Route path="/listings" element={<HiringLayout />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route
              path="/bussiness-profile-details"
              element={<BusinessProfile />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favouraties" element={<Favouraties />} />
            <Route path="/contracts" element={<Contacts />} />
            <Route path="/offers" element={<Reservations />} />
            <Route
              path="/reservation-detail"
              element={<ReservationDetails />}
            />
            <Route path="/counter-offer" element={<NewOffer />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<App />} />
          </Routes>
        </Layout>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
