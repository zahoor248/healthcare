import React from "react";

import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="  bg-[#e5f0ff] ">
      <div className="main-container py-4 md:py-8 px-4 md:px-20 items-center  flex justify-between">
        <div>
          <img className="w-72  cursor-pointer" src={Logo} alt="Logo" />
        </div>
        <div className="flex gap-16">
          <div className=" flex items-center gap-8">
            <span className=" text-lg font-normal text-neutral-800">
              For Owners
            </span>
            <span className="text-lg font-medium text-gray-700">
              For Workers
            </span>
          </div>
          <div className=" flex items-center">
            {/* <img
              className="user-image h-10 mr-2 md:mr-5"
              src={User}
              alt="User Image"
            />
            <span className="text-2xl font-semibold text-blue-900">
              Username
            </span> */}
            Register
          </div>
        </div>
      </div>
    </div>
  );
}
