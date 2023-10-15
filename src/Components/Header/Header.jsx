import React from "react";
import "./Header.css";
import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-container bg-blue-200 py-4 md:py-6 px-4 md:px-20 flex items-center justify-between">
      <div>
        <img
          className="logo-header h-12 cursor-pointer"
          src={Logo}
          alt="Logo"
        />
      </div>
      <ul className="header-nav flex items-center space-x-6 md:space-x-10">
        <li className="active text-lg font-medium text-gray-700">For Owners</li>
        <li className="text-lg font-medium text-gray-700">For Workers</li>
      </ul>
      <div className="user-section flex items-center">
        <img
          className="user-image h-10 mr-2 md:mr-5"
          src={User}
          alt="User Image"
        />
        <span className="text-2xl font-semibold text-blue-900">Username</span>
      </div>
    </div>
  );
}
