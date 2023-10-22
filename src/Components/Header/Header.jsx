import React, { useEffect, useState } from "react";

import Logo from "../../assets/images/logo-image.png";
import User from "../../assets/images/avatar.png";
import { Link, useLocation } from "react-router-dom";
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

export default function Header() {
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];
  let hideHeader = ["login", "register"];

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  useEffect(() => {
    if (user) {
      setIsLoggedIn(user);
    }
  }, [user]);

  window.addEventListener("scroll", scrollHandler);
  console.log(user, "HERE IS THE USER");
  return (
    <>
      {!hideHeader.includes(routePath) && (
        <div className="  bg-[#e5f0ff] w-full ">
          <div className="main-container w-full py-4 md:py-[30px] px-3 items-center  flex justify-between">
            <Link to={"/"}>
              <img
                className="lg:w-[276px] md:w-[200px] w-[150px] cursor-pointer"
                src={Logo}
                alt="Logo"
              />
            </Link>
            {!isLoggedIn ? (
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
                    to={"/login"}
                    className="font-normal textlg text-neutral-700 underline px-4 f-f-g cursor-pointer"
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
            ) : (
              <div
                className="ms-auto flex justify-between gap-10"
                defaultActiveKey="#home"
              >
                <div>
                  <Link
                    className="cursor-pointer"
                    as={Link}
                    to="/"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                  </Link>
                </div>

                <div>
                  <Link
                    className="cursor-pointer"
                    as={Link}
                    to="/favouraties"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineFundProjectionScreen
                      style={{ marginBottom: "2px" }}
                    />{" "}
                    Favourites
                  </Link>
                </div>

                <div>
                  <div
                    className="cursor-pointer"
                    as={Link}
                    to="/about"
                    onClick={() => updateExpanded(false)}
                  >
                    <CgFileDocument style={{ marginBottom: "2px" }} />{" "}
                    Reservations
                  </div>
                </div>

                <div>
                  <div
                    className="cursor-pointer"
                    as={Link}
                    to="/privacy-policy"
                    onClick={() => updateExpanded(false)}
                  >
                    <MdPrivacyTip style={{ marginBottom: "2px" }} /> Contracts
                  </div>
                </div>
                <div>
                  <Link
                    className="cursor-pointer"
                    to="/chats"
                    onClick={() => updateExpanded(false)}
                  >
                    <ImBlog style={{ marginBottom: "2px" }} /> Chats
                  </Link>
                </div>
                {/* <div className="fork-btn">
              <Button
                href="https://github.com/soumyajit4419/Portfolio"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </div> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
