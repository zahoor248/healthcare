import React from "react";
import { useSelector } from "react-redux";
import HomeLayout from "./Components/HomeLayout";
import HiringLayout from "./Components/HiringLayout";
import "./Responsive.css";
import Reservations from "./Components/Reservations/Reservations";

function App() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.isLoggedIn);
  {
    /* Home page handler  */
  }
  return (
    <>
      {isAuthenticated && user.type == "bus" ? (
        <HiringLayout />
      ) : isAuthenticated && user.type == "pro" ? (
        <Reservations />
      ) : (
        <HomeLayout />
      )}
    </>
  );
}

export default App;
