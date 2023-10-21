import React, { useEffect } from "react";
import Header from "../Components/Header/Header";
// Create a Header component
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// Create a Footer component

const Layout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user);
  const navigate = useNavigate();
  const unStrictPages = ["/", "register", "login"];
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];

  useEffect(() => {
    if (!isAuthenticated && !unStrictPages.includes(routePath)) {
      navigate("/");
      console.log("hitter");
    }
  }, [isAuthenticated, routePath, navigate]);

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
