import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";
import User from "../../assets/images/avatar.png";
import {
  HiUserCircle,
  HiPencilAlt,
  HiChatAlt2,
  HiHeart,
  HiStar,
} from "react-icons/hi";
import { BiMessageSquareEdit } from "react-icons/bi";
import Select from "react-select";
import csc from "country-state-city";
import { TiTick } from "react-icons/ti";
import { AiOutlineFieldTime } from "react-icons/ai";
import Availability from "../Availability/Availability";
import TextField from "@mui/material/TextField";
import { FaAddressBook } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { MdRoomPreferences } from "react-icons/md";
import Address from "../Address/Address";
import License from "../License/License";
import { useDispatch, useSelector } from "react-redux";
import BusinessProfile from "../BusinessProfile/BusinessProfile";
import Preferences from "../Preferences/Preferences";
import Notification from "../Notification/Notification";
import { setIsLoggedIn, setUser } from "../../Store/Actions/Actions";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { POST } from "../../Api/Post";

const ProfileData = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(user, "user");
  const submitHandler = (event) => {
    event.preventDefault();

    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      description: "",
    };
    POST(data, `user`, "put")
      .then((response) => {
        console.log(response, "here is res");
        // setUserDetails(response?.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("https://jsonplaceholder.typicode.com/posts/", {})
      .then((response) => {
        console.log(response);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
  };
  return (
    <div className="flex flex-col gap-4 w-full my-12">
      <div className="profile-editing-header">
        <BiMessageSquareEdit className="edit-box-icon" />
        <p className="my-profile-text">My Profile</p>
      </div>

      <div className="bg-white shadow-class rounded-lg h-full p-8 flex flex-col justify-between">
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col gap-4 w-full">
            <div className="flex justify-between w-full gap-3">
              <div className="flex w-full flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  First Name
                </p>
                <input
                  placeholder="First Name"
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="First Name"
                  variant="outlined"
                  id="firstName"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  Last name
                </p>
                <input
                  placeholder="Last Name"
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="Last Name"
                  variant="outlined"
                  id="lastName"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Email
              </p>
              <input
                placeholder="Enter Email"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Email"
                variant="outlined"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Password
              </p>
              <input
                placeholder="Enter Password"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Password"
                variant="outlined"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Confirm Password
              </p>
              <input
                placeholder="Confirm your Password"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Confirm Password"
                variant="outlined"
                id="confirmPassword"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                About me
              </p>
              <textarea
                placeholder="Enter Phone Number"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Phone"
                variant="outlined"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex mt-6 gap-3 justify-end w-auto">
            <button
              onClick={() => handleLogout()}
              className=" border text-[#0f75bc] border-[#0f75bc] px-5 py-2 rounded-md "
            >
              Logout
            </button>
            <button className="  hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md  ">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BusinessProfileData = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(user, "user");
  const submitHandler = (event) => {
    event.preventDefault();

    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      description: "",
    };
    POST(data, `user`, "put")
      .then((response) => {
        console.log(response, "here is res");
        // setUserDetails(response?.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("https://jsonplaceholder.typicode.com/posts/", {})
      .then((response) => {
        console.log(response);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
  };
  return (
    <div className="flex flex-col gap-4 w-full my-12">
      <div className="profile-editing-header">
        <BiMessageSquareEdit className="edit-box-icon" />
        <p className="my-profile-text">My Profile</p>
      </div>

      <div className="bg-white shadow-class rounded-lg h-full p-8 flex flex-col justify-between">
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Business Name
              </p>
              <input
                placeholder="Enter Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Email"
                variant="outlined"
                id="email"
                name="email"
                value={""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Company Website
              </p>
              <input
                placeholder="Enter URL"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Password"
                variant="outlined"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Phone
              </p>
              <input
                placeholder="Enter Phone"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Confirm Password"
                variant="outlined"
                id="confirmPassword"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                About Business
              </p>
              <textarea
                placeholder="Start Writing Here..."
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Phone"
                variant="outlined"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex mt-6 gap-3 justify-end w-auto">
            <button className="  hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md  ">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Profile = () => {
  const [nav, setNav] = useState("profile");
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex main-container gap-8 h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
        <div className="py-12 w-[40%] max-w-[310px] h-full">
          <div className=" bg-white   py-10 w-full h-full rounded-lg shadow-class">
            <div className="flex flex-col pb-6 items-center">
              <img src={User} alt="user profile image" className="w-20 h-20" />
              <p className="text-xl pt-3 font-semibold">
                {user?.firstname} {user?.lastname}
              </p>
            </div>

            <div>
              <ul className="side-nav flex gap-0.5">
                <li
                  onClick={() => setNav("profile")}
                  className={`side-nav-item ${
                    nav === "profile" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <HiUserCircle className="pen-icon" />
                    <span className="normal-case">My Profile</span>
                  </div>
                </li>

                {user.type == "bus" && (
                  <li
                    onClick={() => setNav("business-profile")}
                    className={`side-nav-item ${
                      nav === "business-profile" && "side-nav-item-active"
                    }`}
                  >
                    <div className="side-nav-link">
                      <HiUserCircle className="pen-icon" />
                      <span>Business Profile</span>
                    </div>
                  </li>
                )}

                <li
                  onClick={() => setNav("address")}
                  className={`side-nav-item ${
                    nav === "address" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      class="edit-box-icon !m-0 !text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
                    </svg>
                    <span className="normal-case">Address</span>
                  </div>
                </li>

                {user.type != "bus" && (
                  <li
                    onClick={() => setNav("licenses")}
                    className={`side-nav-item ${
                      nav === "licenses" && "side-nav-item-active"
                    }`}
                  >
                    <div className="side-nav-link">
                      <TbLicense className="pen-icon" />
                      <span className="normal-case">Licenses</span>
                    </div>
                  </li>
                )}

                {user.type != "bus" && (
                  <li
                    onClick={() => setNav("preferences")}
                    className={`side-nav-item ${
                      nav === "preferences" && "side-nav-item-active"
                    }`}
                  >
                    <div className="side-nav-link">
                      <MdRoomPreferences className="pen-icon" />
                      <span className="normal-case">Preferences</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* <Availability/> */}
        {/* <License/> */}
        {/* <BusinessProfile/> */}
        {/* <Preferences/> */}
        {/* <Notification/> */}
        {nav === "profile" && <ProfileData />}
        {nav == "business-profile" && user.type == "bus" && (
          <BusinessProfileData />
        )}
        {nav === "address" && <Address />}
        {nav === "licenses" && <License />}
        {nav === "preferences" && <Preferences />}
      </div>
    </>
  );
};
export default Profile;
