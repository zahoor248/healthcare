import React from "react";
import { useSelector } from "react-redux";
import HomeLayout from "./Components/HomeLayout";
import HiringLayout from "./Components/HiringLayout";
import "./Responsive.css";
import Reservations from "./Components/Reservations/Reservations";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/Signup2";
import ScrollToTop from "./helper/ScrollToTop";

function App() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.isLoggedIn);
  return (
    <>
      {isAuthenticated && user.type == "bus" ? (
        <>{user?.addresses.length ? <HiringLayout /> : <SignUp />}</>
      ) : isAuthenticated && user.type == "pro" ? (
        <>
          {user?.addresses.length && user.licenses.length ? (
            <Reservations />
          ) : (
            <SignUp />
          )}
        </>
      ) : (
        <div />
      )}

      <ScrollToTop />
    </>
  );
}

export default App;