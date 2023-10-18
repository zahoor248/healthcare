import React from "react";

import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="  bg-[#e5f0ff] w-full ">
      <div className="main-container w-full py-4 md:py-[30px] px-3 items-center  flex justify-between">
        <Link to={"/"}>
          <img
            className="lg:w-[276px] md:w-[200px] w-[150px] cursor-pointer"
            src={Logo}
            alt="Logo"
          />
        </Link>
        <div className="flex gap-5 md:gap-10 lg:gap-20 xl:gap-24">
          <div className="f-f-g-m flex items-center gap-3 md:gap-6 lg:gap-10">
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
            <Link
              to={"/register"}
              className="font-bold text-xl f-f-g cursor-pointer"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
