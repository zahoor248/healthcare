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
    <div className="flex flex-col gap-8 w-full my-12">
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
              className=" border text-blue-600 border-blue-600 px-5 py-2 rounded-lg "
            >
              Logout
            </button>
            <button className=" px-6 py-3 bg-blue-600 text-white rounded-lg  ">
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
        <div className="py-12 w-[40%] max-w-[330px] h-full">
          <div className=" bg-white   py-10 w-full h-full rounded-lg shadow-class">
            <div className="flex flex-col pb-6 items-center">
              <img src={User} alt="user profile image" className="w-20 h-20" />
              <p className="text-xl font-semibold">
                {user?.firstname} {user?.lastname}
              </p>
            </div>

            <div>
              <ul className="side-nav">
                <li
                  onClick={() => setNav("profile")}
                  className={`side-nav-item ${
                    nav === "profile" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <HiUserCircle className="pen-icon" />
                    <span>My Profile</span>
                  </div>
                </li>

                {/* <li
                  className={`side-nav-item ${
                    nav === "profile" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <HiUserCircle className="pen-icon" />
                    <span>Business Profile</span>
                  </div>
                </li> */}

                <li
                  onClick={() => setNav("address")}
                  className={`side-nav-item ${
                    nav === "address" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <FaAddressBook className="pen-icon" />
                    <span>Address</span>
                  </div>
                </li>

                <li
                  onClick={() => setNav("licenses")}
                  className={`side-nav-item ${
                    nav === "licenses" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <TbLicense className="pen-icon" />
                    <span>Licenses</span>
                  </div>
                </li>

                <li
                  onClick={() => setNav("preferences")}
                  className={`side-nav-item ${
                    nav === "preferences" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link">
                    <MdRoomPreferences className="pen-icon" />
                    <span>Preferences</span>
                  </div>
                </li>
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

        {nav === "address" && <Address />}
        {nav === "licenses" && <License />}
        {nav === "preferences" && <Preferences />}
      </div>
    </>
  );
};
export default Profile;
