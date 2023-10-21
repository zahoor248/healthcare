import React from "react";
import logo from "./logo.svg";
import HomeLayout from "./Components/HomeLayout";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import HiringLayout from "./Components/HiringLayout";
import LogIn from "./Components/LogIn/LogIn";

import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import Availability from "./Components/Availability/Availability";
import Chat from "./Components/Chat/Chat";
import "./Responsive.css";
import Address from "./Components/Address/Address";
import AllPros from "./Components/AllPros";

import cors from "cors";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user, "here is the user");
  return (
    <>
      {/* <ForgotPassword/> */}
      {/* <ProfileDetails/> */}
      {/* <Availability/> */}
      {/* <Chat/> */}
      {/* <SignUp/> */}
      {/* <Profile /> */}
      <Header />
      <HomeLayout />
    
      {user ? (
        <>
          <Navbar />
          {/* <Route path="/" component={HiringLayout} />
              <Route path="/Profile" component={Profile} /> */}
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
}

export default App;
