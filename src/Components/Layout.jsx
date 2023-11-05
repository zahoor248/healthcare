import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
// Create a Header component
import Footer from "../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAPIRequest } from "../helper/ApiHandler";
import { getAllPros, setIsLoggedIn, setUser } from "../Store/Actions/Actions";
// Create a Footer component

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const unStrictPages = ["/", "register", "login"];
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user == null) {
      // on refresh the layout checks if user data is null then the call trigerred and loads data
      handleAPIRequest("get", "user", null)
        .then((response) => {
          dispatch(setUser(response.user.profile));

          dispatch(setIsLoggedIn(true));
          // to prevent from loading on listing page we are making call here
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
    // this is checking if the user is not logged in then push back to the home page except public pages
    if (!isAuthenticated && !unStrictPages.includes(routePath) && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, routePath, navigate]);

  return (
    <>
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <svg viewBox="0 0 240 240" height="240" width="240" class="pl">
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-330"
              stroke-dasharray="0 660"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--a"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-110"
              stroke-dasharray="0 220"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--b"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              class="pl__ring pl__ring--c"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              class="pl__ring pl__ring--d"
            ></circle>
          </svg>
        </div>
      ) : (
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
