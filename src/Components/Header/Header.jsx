import React from "react";

import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="  bg-[#e5f0ff] ">
      <div className="main-container py-4 md:py-[30px] px-3 items-center  flex justify-between">
        <div>
          <img className="w-[276px]  cursor-pointer" src={Logo} alt="Logo" />
        </div>
        <div className="flex gap-24">
          <div className="f-f-g-m flex items-center gap-10">
            <span className=" text-lg font-normal text-neutral-500 hover:text-[#10274f] cursor-pointer transition-all ease-in-out duration-300">
              For Owners
            </span>

            <span className="text-lg font-medium text-neutral-500 hover:text-[#10274f] cursor-pointer transition-all ease-in-out duration-300">
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
            <spna className="font-bold text-xl f-f-g cursor-pointer">Register</spna>
          </div>
        </div>
      </div>
    </div>
  );
}
