import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const ProfileData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.about_me);
  const [password, setPassword] = useState({
    passwordToSend: null,
    passwordToConfirm: "",
  });
  const submitHandler = (event) => {
    event.preventDefault();
    if (password.passwordToConfirm == password.passwordToSend) {
      let data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: "Faraz@124",
        about_me: description,
      };
      handleAPIRequest("PUT", "user", data)
        .then((response) => {
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("password doesnot match");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
                value={password.passwordToSend}
                onChange={(e) =>
                  setPassword({ ...password, passwordToSend: e.target.value })
                }
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
                value={password.passwordToConfirm}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    passwordToConfirm: e.target.value,
                  })
                }
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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


// BusinessProfileData tab 

const BusinessProfileData = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [business, setBusiness] = useState({
    name: "",
    about: "",
    url: "",
    public_phone: "",
    bus_logo: "",
  });

  useEffect(() => {
    if (user.accounts) {
      if (user.accounts[0].bus_profile) {
        setBusiness({
          name: user.accounts[0].bus_profile.company_name,
          url: user.accounts[0].bus_profile.website_url,
          about: user.accounts[0].bus_profile.about,
          public_phone: user.accounts[0].bus_profile.public_phone,
          bus_logo: user.accounts[0].bus_profile.logo_url
            ? user.accounts[0].bus_profile.logo_url
            : "",
          uuid: user.accounts[0].uuid,
        });
      }
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    let data = {
      company_name: business.name,
      about: business.about,
      website_url: business.url,
      public_phone: business.public_phone,
      uuid: user.accounts[0].uuid,
    };

    handleAPIRequest("POST", "bus-profile", data)
      .then((response) => {
        if (response) {
          // return;
          postData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // upload image request
  async function postData() {
    const token = localStorage.getItem("token");
    if (business.bus_logo instanceof File) {
      // Check if a file object is available
      try {
        const ext = business.bus_logo.name.split(".").pop();
        const type = `image/${ext}`;
        const formData = new FormData();
        formData.append("image", business.bus_logo, `image.${ext}`);
        formData.append("uuid", business.uuid);

        const response = await axios.post(
          `https://app.healthcare-up.com/api/v1/bus-logo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check the response data
        if (response.data) {
          handleAPIRequest("get", "user", null).then((response) => {
            dispatch(setUser(response.user.profile));
          });
          // Handle the response data here
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors
      }
    }
  }

  // Create a function to handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Set the selected file to the bus_logo state
      setBusiness({ ...business, bus_logo: selectedFile });
    }
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
        <p className="my-profile-text">Business Profile</p>
      </div>

      <div className="bg-white shadow-class rounded-lg h-full px-8 pb-4 flex flex-col justify-between overflow-auto">
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col justify-center items-center gap-4 w-full">
            <div class="profileImage">
              {user.accounts[0].bus_profile.logo_url ? (
                <img
                  src={user.accounts[0].bus_profile.logo_url}
                  className="object-cover h-full w-full"
                />
              ) : (
                <svg viewBox="0 0 128 128">
                  <circle r={60} fill="transparent" cy={64} cx={64} />
                  <circle r={48} fill="transparent" cy={64} cx={64} />
                  <path
                    fill="#191919"
                    d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"
                  />
                  <path
                    opacity={1}
                    fill="#191919"
                    d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z"
                  />
                  <circle r={7} fill="#fbc0aa" cy={65} cx={89} />
                  <path
                    fill="#4bc190"
                    d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z"
                  />
                  <path
                    opacity=".3"
                    fill="#356cb6"
                    d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z"
                  />
                  <path
                    opacity=".3"
                    fill="#356cb6"
                    d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"
                  />
                  <path
                    fill="#fff"
                    d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"
                  />
                  <path
                    strokeWidth={14}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#fbc0aa"
                    fill="none"
                    d="m64 88.75v9.75"
                  />
                  <circle r={7} fill="#fbc0aa" cy={65} cx={39} />
                  <path
                    fill="#ffd8ca"
                    d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z"
                  />
                  <path
                    fill="#191919"
                    d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z"
                  />
                  <path
                    style={{
                      fill: "none",
                      strokeLinecap: "round",
                      stroke: "#fff",
                      strokeMiterlimit: 10,
                      strokeWidth: 2,
                      opacity: ".1",
                    }}
                    d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"
                  />
                  <path
                    style={{
                      fill: "none",
                      strokeLinecap: "round",
                      stroke: "#fff",
                      strokeMiterlimit: 10,
                      strokeWidth: 2,
                      opacity: ".1",
                    }}
                    d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"
                  />
                  <circle r={3} fill="#515570" cy="62.28" cx={76} />
                  <circle r={3} fill="#515570" cy="62.28" cx={52} />
                  <ellipse
                    ry="2.98"
                    rx="4.58"
                    opacity=".1"
                    fill="#f85565"
                    cy="69.67"
                    cx="50.42"
                  />
                  <ellipse
                    ry="2.98"
                    rx="4.58"
                    opacity=".1"
                    fill="#f85565"
                    cy="69.67"
                    cx="77.58"
                  />
                  <g strokeLinejoin="round" strokeLinecap="round" fill="none">
                    <path strokeWidth={4} stroke="#fbc0aa" d="m64 67v4" />
                    <path
                      strokeWidth={2}
                      stroke="#515570"
                      opacity=".2"
                      d="m55 56h-9.25"
                    />
                    <path
                      strokeWidth={2}
                      stroke="#515570"
                      opacity=".2"
                      d="m82 56h-9.25"
                    />
                  </g>
                  <path
                    opacity=".4"
                    fill="#f85565"
                    d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"
                  />
                  <path
                    fill="#f85565"
                    d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z"
                  />
                </svg>
              )}
            </div>
            <div class="textContainer flex items-center">
              <button className="upload-button w-fit relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="opacity-0 cursor-pointer z-10 absolute px-6 -left-0 py-4 w-full"
                />
                <div class="svg-wrapper-1">
                  <div class="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                </div>
                <span>Upload Image</span>
              </button>
            </div>
            <div className="flex flex-col w-full gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Business Name
              </p>
              <input
                placeholder="Enter Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Name"
                variant="outlined"
                id="name"
                name="name"
                value={business.name}
                onChange={(e) =>
                  setBusiness({ ...business, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Company Website
              </p>
              <input
                placeholder="Enter URL"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="URL"
                variant="outlined"
                id="URL"
                name="URL"
                value={business.url}
                onChange={(e) =>
                  setBusiness({ ...business, url: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Phone
              </p>
              <input
                placeholder="Enter Phone"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Confirm Password"
                variant="outlined"
                id="public_phone"
                name="public_phone"
                value={business.public_phone}
                onChange={(e) =>
                  setBusiness({ ...business, public_phone: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
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
                value={business.about}
                onChange={(e) =>
                  setBusiness({ ...business, about: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="flex mt-6 gap-3 justify-end w-auto">
            <button
              onClick={(e) => submitHandler(e)}
              className="  hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md  "
            >
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
                      nav === "business-profile" && "side-nav-item-active "
                    }`}
                  >
                    <div className="side-nav-link">
                      <HiUserCircle className="pen-icon" />
                      <span  className="normal-case">Business Profile</span>
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
