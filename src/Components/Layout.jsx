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
          <div class="boxes">
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="f-f-g-s">
          <Header />
          <main >{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
