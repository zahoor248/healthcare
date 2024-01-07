import React, { useEffect, useState } from "react";

import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/holderpic.jpeg";
import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdEmojiPeople } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { useSelector } from "react-redux";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineVideoCamera,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { MdPrivacyTip } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import HamburgerSideBar from "../HamburgerSideBar/HamburgerSideBar";

export default function Header() {
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [collpse, setCollaps] = useState(false);

  const handleBar = () => {
    setShowBar(true);
  };
  const handleClose = () => {
    setShowBar(false);
  };
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];
  let hideHeader = ["login", "register"];
  const isAuthenticate = useSelector((state) => state.isLoggedIn);
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  console.log(location);
  window.addEventListener("scroll", scrollHandler);
  return (
    <>
      {!hideHeader.includes(routePath) && user != null && (
        <div className="  bg-[#e5f0ff] w-full ">
          <div className="main-container w-full py-4 2xl:py-[26px] px-3 items-start  flex justify-between">
            <Link to={"/"}>
              <img
                className="2xl:w-[230px] absolute md:relative xl:w-[200px] w-[150px] cursor-pointer"
                src={Logo}
                alt="Logo"
              />
            </Link>
            {!isAuthenticate ? (
              <>
                <div className=" hidden md:flex gap-5 md:gap-10 lg:gap-20 xl:gap-24">
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
                      to={"/login"}
                      className="font-bold text-xl f-f-g px-4 cursor-pointer"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="font-bold text-xl f-f-g cursor-pointer"
                    >
                      Register
                    </Link>
                  </div>
                </div>

                <div
                  className={`block md:hidden h-0 w-full overflow-hidden justify-center items-center relative transition-all ease-in-out duration-300 
        ${collpse ? "h-[238px]" : "py-1.5"}
        `}
                >
                  <div className="h-full flex mt-8 w-full items-center gap-4 justify-center flex-col">
                    <span className=" text-lg font-normal text-neutral-500 hover:text-[#10274f] cursor-pointer transition-all ease-in-out duration-300">
                      For Owners
                    </span>

                    <span className="text-lg font-medium text-neutral-500 hover:text-[#10274f] cursor-pointer transition-all ease-in-out duration-300">
                      For Workers
                    </span>

                    <Link
                      to={"/register"}
                      className="font-bold text-xl f-f-g cursor-pointer"
                    >
                      Register
                    </Link>
                    <Link
                      to={"/login"}
                      className="font-normal textlg text-neutral-700 underline px-4 f-f-g cursor-pointer"
                    >
                      Login
                    </Link>
                  </div>
                </div>
                <div
                  className={"md:hidden absolute right-4  cursor-pointer"}
                  onClick={() => setCollaps(!collpse)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div
                  className="ms-auto md:flex justify-between gap-4 lg:gap-7 hidden"
                  defaultActiveKey="#home"
                >
                  <div className="flex items-center">
                    <Link
                      className={`cursor-pointer flex ${
                        location.pathname == "/"
                          ? "text-[#0f75bc]"
                          : "text-neutral-600"
                      } items-center gap-2 transition-all ease-in-out duration-300 text-sm xl:text-base`}
                      as={Link}
                      to="/"
                      onClick={() => updateExpanded(false)}
                    >
                      <IoMdHome size={25} />
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="xl:w-5 xl:h-5 h-3 w-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg> */}
                      Home
                    </Link>
                  </div>

                  {user.type == "bus" && (
                    <div className="flex items-center">
                      <Link
                        className={`cursor-pointer flex ${
                          location.pathname == "/favouraties"
                            ? "text-[#0f75bc]"
                            : "text-neutral-600"
                        } items-center gap-2 transition-all ease-in-out duration-300 text-sm xl:text-base`}
                        as={Link}
                        to="/favouraties"
                        onClick={() => updateExpanded(false)}
                      >
                        <MdFavorite size={20} />
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="xl:w-5 xl:h-5 h-3 w-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg> */}
                        Favorites
                      </Link>
                    </div>
                  )}

                  {user.type == "bus" && (
                    <div className="flex items-center">
                      <Link
                        className={`cursor-pointer flex ${
                          location.pathname == "/offers"
                            ? "text-[#0f75bc]"
                            : "text-neutral-600"
                        } items-center gap-2 transition-all ease-in-out duration-300 text-sm xl:text-base`}
                        as={Link}
                        to="/offers"
                        onClick={() => updateExpanded(false)}
                      >
                        <MdEmojiPeople size={20} />
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="xl:w-5 xl:h-5 h-3 w-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                          />
                        </svg> */}
                        Offers
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center">
                    <Link
                      className={`cursor-pointer flex ${
                        location.pathname == "/contracts"
                          ? "text-[#0f75bc]"
                          : "text-neutral-600"
                      } items-center gap-2 transition-all ease-in-out duration-300 text-sm xl:text-base`}
                      as={Link}
                      to="/contracts"
                      onClick={() => updateExpanded(false)}
                    >
                      <FaFileContract size={20} />
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="xl:w-5 xl:h-5 h-3 w-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg> */}
                      Contracts
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Link
                      className={`cursor-pointer flex ${
                        location.pathname == "/chats"
                          ? "text-[#0f75bc]"
                          : "text-neutral-600"
                      } items-center gap-2 transition-all ease-in-out duration-300 text-sm xl:text-base`}
                      to="/chats"
                      onClick={() => updateExpanded(false)}
                    >
                      <FaMessage size={20} />
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="xl:w-5 xl:h-5 h-3 w-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg> */}
                      Chats
                    </Link>
                  </div>

                  <Link to={"/profile"} className="flex items-center gap-2">
                    <div className=" !rounded-full overflow-hidden md:h-8 md:w-8 xl:w-10 xl:h-10">
                      {user?.photo_url != null ? (
                        <img src={user?.photo_url} />
                      ) : (
                        <img src={User} />
                      )}
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    {/* <h4 class="text-lg leading-3 text-center w-full h-full rounded-full bg-neutral-400 animate-pulse"></h4> */}
                    <div className="text-sm lg:text-sm 2xl:text-lg mt-2 text-neutral-800">
                      <div className="text-[8px] xl:text-xs leading-none">
                        Welcome
                      </div>
                      <span className="text-sm lg:text-xs 2xl:text-lg leading-none text-neutral-800">
                        {user?.firstname}
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="md:hidden cursor-pointer"
                  onClick={() => setShowBar(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
                {showBar && <HamburgerSideBar setShowBar={setShowBar} />}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
