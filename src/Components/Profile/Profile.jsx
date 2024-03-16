import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Profile.css";
import User from "../../assets/images/holderpic.jpeg";
import {
  HiUserCircle,
  HiPencilAlt,
  HiChatAlt2,
  HiHeart,
  HiStar,
} from "react-icons/hi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FaIdCard } from "react-icons/fa";

import { CiLogout } from "react-icons/ci";

import { FaClock } from "react-icons/fa6";

import { MdBusinessCenter } from "react-icons/md";
import { formatPhoneNumber } from "../../helper/PhoneFormat";

import { TbLicense } from "react-icons/tb";
import { MdRoomPreferences } from "react-icons/md";
import Address from "../Address/Address";
import License from "../License/License";
import { useDispatch, useSelector } from "react-redux";

import Preferences from "../Preferences/Preferences";

import { setIsLoggedIn, setUser } from "../../Store/Actions/Actions";
import { handleAPIRequest } from "../../helper/ApiHandler";

import { useNavigate } from "react-router-dom";
import Toast from "../AppLoader";
import CommonPrimaryButton from "../CommonPrimaryButton";
import DeleteAccount from "../DeleteAccount";

const ProfileData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.about_me);
  const [loading_button, setLoading_button] = useState(false);
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });
  const [password, setPassword] = useState({
    passwordToSend: null,
    passwordToConfirm: "",
  });
  const submitHandler = (event) => {
    setLoading_button(true);
    if (password.passwordToConfirm == password.passwordToSend) {
      if (
        (firstName.trim() == "",
        lastName.trim() == "",
        email.trim() == "",
        description.trim() == "")
      ) {
        setShowToast({
          ...showToast,
          toggle: true,
          status: "error",
          message: "Please fill all the fields",
          lable: "Missing fields",
        });
        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "error",
            message: "Please fill all the fields",
            lable: "Missing fields",
          });
        }, 2000);
        setLoading_button(false);
        return;
      }
      let data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password.passwordToSend,
        about_me: description,
      };
      handleAPIRequest("PUT", "user", data)
        .then((response) => {
          setLoading_button(false);

          setShowToast({
            ...showToast,
            toggle: true,
            status: "success",
            message: "Settings has been updated successfully",
            lable: "Settings Updated",
          });
          setTimeout(() => {
            setShowToast({
              ...showToast,
              toggle: false,
              status: "success",
              message: "Settings has been updated successfully",
              lable: "Settings Updated",
            });
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          setLoading_button(false);
        });
    } else {
      setLoading_button(false);

      setShowToast({
        ...showToast,
        toggle: true,
        status: "error",
        message: "Please recheck your password",
        lable: "Wrong Password",
      });
      setTimeout(() => {
        setShowToast({
          ...showToast,
          toggle: false,
          status: "error",
          message: "Please recheck your password",
          lable: "Wrong Password",
        });
      }, 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
  };
  return (
    <div className="flex flex-col gap-4 w-full md:my-12">
      <div className="profile-editing-header">
        <BiMessageSquareEdit className="edit-box-icon" />
        <p className="my-profile-text">My Profile</p>
      </div>

      <div className="bg-white shadow-class rounded-lg h-full overflow-auto  p-5 md:p-8 flex flex-col justify-between">
        <div>
          <div className=" flex flex-col gap-4 w-full">
            <div className="flex flex-col justify-between w-full gap-3">
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
            <div className="flex flex-col md:flex-row justify-between w-full gap-3">
              <div className="flex flex-col gap-2 w-full">
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
              <div className="flex flex-col gap-2 w-full">
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
          <div className="flex mt-6 gap-3 justify-between w-auto">
            {/* <button
              onClick={() => handleLogout()}
              className=" border text-[#0f75bc] border-[#0f75bc] px-5 py-2 rounded-md "
            >
              Logout
            </button> */}
            <CommonPrimaryButton
              onClick={() => submitHandler()}
              loading={loading_button}
              text={"Update"}
            />
          </div>
        </div>
      </div>
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
};

// BusinessProfileData tab

const BusinessProfileData = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [loading_button, setLoading_button] = useState(false);

  const [business, setBusiness] = useState({
    name: "",
    about: "",
    url: "",
    public_phone: "",
    bus_logo: "",
    bus_url: "",
  });
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    if (user.accounts) {
      if (user.accounts[0].bus_profile) {
        setBusiness({
          name: user.accounts[0].bus_profile?.company_name,
          url: user.accounts[0].bus_profile?.website_url,
          about: user.accounts[0].bus_profile?.about,
          public_phone: user.accounts[0]?.bus_profile?.public_phone,
          bus_logo: user.accounts[0].bus_profile?.logo_url
            ? user.accounts[0].bus_profile?.logo_url
            : "",
          uuid: user.accounts[0].uuid,
        });
      }
      console.log("Test");
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading_button(true);
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
          const res = postData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // upload image request
  async function postData() {
    setLoading_button(true);

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
          `https://app.healthcare-up.com/bus-logo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check the response data
        if (response.data) {
          handleAPIRequest("get", "user", null).then((response) => {
            dispatch(setUser(response.user.profile));

            handleAPIRequest("get", "user", null)
              .then((response) => {
                dispatch(setUser(response.user.profile));
                setBusiness({
                  ...business,
                  bus_url: "",
                  bus_logo: "",
                });
                setLoading_button(false);
                // setLoading_button(false);

                // to prevent from loading on listing page we are making call here
              })
              .catch((error) => {
                console.log(error);
                // setLoading_button(false);
              });
          });
          setShowToast({
            ...showToast,
            toggle: true,
            status: "success",
            message: "Settings has been updated successfully",
            lable: "Settings Updated",
          });
          setTimeout(() => {
            setShowToast({
              ...showToast,
              toggle: false,
              status: "success",
              message: "Settings has been updated successfully",
              lable: "Settings Updated",
            });
          }, 2000);
          // Handle the response data here
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors
        setLoading_button(false);
      }
    } else {
      handleAPIRequest("get", "user", null)
        .then((response) => {
          dispatch(setUser(response.user.profile));
          // setLoading_button(false);
          setLoading_button(false);

          // to prevent from loading on listing page we are making call here
        })
        .catch((error) => {
          console.log(error);
          setLoading_button(false);
        });

      setShowToast({
        ...showToast,
        toggle: true,
        status: "success",
        message: "Settings has been updated successfully",
        lable: "Settings Updated",
      });
      setTimeout(() => {
        setShowToast({
          ...showToast,
          toggle: false,
          status: "success",
          message: "Settings has been updated successfully",
          lable: "Settings Updated",
        });
      }, 2000);
    }
  }

  // Create a function to handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target?.files[0];
    if (selectedFile) {
      // Set the selected file and its data URL to the bus_logo and bus_url state
      const reader = new FileReader();

      reader.onloadend = () => {
        setBusiness({
          ...business,
          bus_url: reader.result,
          bus_logo: selectedFile,
        });
      };

      reader.readAsDataURL(selectedFile);
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

      <div className="bg-white shadow-class rounded-lg h-full px-8 pb-4 flex flex-col justify-between overflow-auto mb-6 md:mb-0">
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col justify-center items-center gap-4 w-full">
            <div class="profileImage">
              {business?.bus_url || user.accounts[0].bus_profile?.logo_url ? (
                <img
                  src={
                    business?.bus_url
                      ? business?.bus_url
                      : user.accounts[0].bus_profile?.logo_url
                  }
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
                  onChange={(e) => handleFileSelect(e)}
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
                  setBusiness({
                    ...business,
                    public_phone: formatPhoneNumber(e.target.value),
                  })
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
            <CommonPrimaryButton
              onClick={(e) => submitHandler(e)}
              loading={loading_button}
              text={"Update Profile"}
            />
          </div>
        </form>
      </div>
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
};

const Profile = () => {
  const [nav, setNav] = useState("profile");
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [deleteUser, setDeleteUser] = useState(false);
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });

  const handleFileSelect = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      const reader = new FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("uuid", user.uuid);

        const response = await axios.post(
          `https://app.healthcare-up.com/user-photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzBmYzQzZS0zNjdlLTQ5YzMtYTIzNS02ZGU4MjAxY2QxMmMiLCJqdGkiOiJjMjBiOWFiZjM1M2Y2MGNlNDAyMzVmZTUzOWNmMzc4OTIxNWVhZjRhM2E2YjYyZWQ5YjY4N2ViNzQ2OWU1YzhjYThhMTQxZGJjNzBhN2U3ZiIsImlhdCI6MTcxMDE3NjA1Mi4wODk1NjkwOTE3OTY4NzUsIm5iZiI6MTcxMDE3NjA1Mi4wODk1NzAwNDU0NzExOTE0MDYyNSwiZXhwIjoxNzQxNzEyMDUyLjA4NzEzMTk3NzA4MTI5ODgyODEyNSwic3ViIjoiMzYiLCJzY29wZXMiOltdfQ.ADhbhxHn2rpniEqBt_asOHmsUjAQ6m_RTb4BBwfVwbSfB9H23va5uFq4DxCotTaag0VanYsrHzpiMytWCnvwHtcdcQUuK8Gkyo1XluhWIKxGfxIefUhZ9piDjQ0jgY509J78HiBwYW2ejEPrFFARvHh0K4R-jXIs5aIsHboSambCLReFzVlnPnfL8z1F9XpiBOZ4J-hEP12lfiK_4Yv9M_X5XVGkSauo3flFAn3s1DN-eCYKULzcvDqDxxb84-Cqx9B8OmFRzNx5771CS_R7SmrynKtEtpjUu2DfuLzphkcbYlBp3UENVgRfuiuuwrX4iJa6jzv3MsacNzcYsahVB9eNsbVMWbKX6NArpDXaZI8Km-bghG88HVZxFZsyPmdGOpqa1WNvVRGTh_MylTBEOj8i6CnPyRpnBauUDnGEJDE_boC_FgI8r4whxo8vSbieb1SasD6L5W34lLjlTSD9BF6oL8Z6WsqSH48PvqqmitIM2anA1U2DlLNE0vqj5Zdqgya5P61uGAC5RlQJGxw5Mkq6NjLy8JFf2p2E-Ml4LW9_W5AGRX5wqF0LpPUQtnopPs9GKrMQac3yAAMA4DK9Z5lCHvWkH8swhhsQo2cz6X4GDtg_mOqKpBC-NROgp-HZt9nrEOcaoaIjebNIkccbuaAN_glPIUeDVTfEre_wc-M`,
            },
          }
        );

        if (response.data) {
          handleAPIRequest("get", "user", null)
            .then((response) => {
              dispatch(setUser(response.user.profile));
              setShowToast({
                ...showToast,
                toggle: true,
                status: "success",
                message: "Profile has been uploaded successfully",
                lable: "Upload Successfull",
              });
              setTimeout(() => {
                setShowToast({
                  ...showToast,
                  toggle: false,
                  status: "success",
                  message: "Profile has been uploaded successfully",
                  lable: "Upload Successfull",
                });
              }, 2000);
            })
            .catch((error) => {
              setTimeout(() => {
                setShowToast({
                  ...showToast,
                  toggle: false,
                  status: "error",
                  message: "Please try again later",
                  lable: "Error Uploading",
                });
              });
              setShowToast({
                ...showToast,
                toggle: true,
                status: "success",
                message: "Please try again later",
                lable: "Error Uploading",
              });
            });

          // Handle the response data here
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, e.g., show error message to user
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row main-container gap-8 overflow-auto w-full">
        <div className="md:py-12 py-2 w-full md:w-[40%] md:max-w-[310px]">
          <div className=" bg-white relative  md:py-10 w-full md:h-full rounded-lg shadow-class">
            <div className="hidden md:flex flex-col pb-6 items-center">
              <img
                src={user?.photo_url != null ? user?.photo_url : User}
                alt="user profile image"
                className="w-20 h-20 border border-neutral-200 rounded-full"
              />

              <svg
                className="absolute mt-[53px] w-6 h-6 p-0.5  ml-8 bg-neutral-700 border rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#fafafa"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e)}
                className="opacity-0 cursor-pointer z-10 absolute px-6 -left-0 py-6 w-full"
              />
              <p className="text-xl pt-3 font-semibold">
                {user?.firstname} {user?.lastname}
              </p>
            </div>

            <div>
              <ul className="side-nav flex !flex-row md:!flex-col gap-0.5">
                <li
                  onClick={() => setNav("profile")}
                  className={`side-nav-item !pl-1 md:!pl-8 w-full ${
                    nav === "profile" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link !py-2 md:!py-4">
                    <HiUserCircle className="pen-icon " />
                    <span className="normal-case !text-[10px] md:!text-base">
                      My Profile
                    </span>
                  </div>
                </li>

                {user.type == "bus" && (
                  <li
                    onClick={() => setNav("business-profile")}
                    className={`side-nav-item !pl-1 md:!pl-8 w-full ${
                      nav === "business-profile" && "side-nav-item-active "
                    }`}
                  >
                    <div className="side-nav-link !py-2 md:!py-4">
                      <MdBusinessCenter className="pen-icon" />
                      <span className="normal-case  !text-[10px]  md:!text-base whitespace-nowrap md:whitespace-normal">
                        Business Profile
                      </span>
                    </div>
                  </li>
                )}

                <li
                  onClick={() => setNav("address")}
                  className={`side-nav-item !pl-1 md:!pl-8 w-full ${
                    nav === "address" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link !py-2 md:!py-4">
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
                    <span className="normal-case  !text-[10px]  md:!text-base">
                      Addresses
                    </span>
                  </div>
                </li>

                {user.type != "bus" && (
                  <li
                    onClick={() => setNav("licenses")}
                    className={`side-nav-item !pl-1 md:!pl-8 ${
                      nav === "licenses" && "side-nav-item-active"
                    }`}
                  >
                    <div className="side-nav-link !py-2 md:!py-4">
                      <FaIdCard className="pen-icon" />
                      <span className="normal-case  !text-[10px]  md:!text-base">
                        Licenses
                      </span>
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
                    <div className="side-nav-link !py-2 md:!py-4">
                      <FaClock className="pen-icon" />
                      <span className="normal-case  !text-[10px]  md:!text-base mr-2.5 md:mr-0">
                        Preferences
                      </span>
                    </div>
                  </li>
                )}

                <li
                  onClick={() => {
                    document.getElementById("logout-form").submit();
                  }}
                  className={`side-nav-item ${
                    nav === "preferences" && "side-nav-item-active"
                  }`}
                >
                  <div className="side-nav-link !py-2 md:!py-4">
                    <CiLogout className="pen-icon" />
                    <span className="normal-case  !text-[10px]  md:!text-base mr-2.5 md:mr-0">
                      Logout
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex w-full absolute -left-[0.45rem] bottom-6 justify-between gap-3  flex-col px-6">
              <button
                onClick={() => setDeleteUser(true)}
                className="  text-red-600 hover:bg-red-50 transition-all ease-in-out duration-300 border-[#0f75bc] whitespace-nowrap px-5 py-2 rounded-md "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* <Availability/> */}
        {/* <License/> */}
        {/* <BusinessProfile/> */}
        {/* <Preferences/> */}
        {/* <Notification/> */}

        <div className="min-h-[750px] w-full">
          {nav === "profile" && <ProfileData />}
          {nav == "business-profile" && user.type == "bus" && (
            <BusinessProfileData />
          )}
          {nav === "address" && <Address />}
          {nav === "licenses" && <License />}
          {nav === "preferences" && <Preferences />}
        </div>
      </div>
      <Toast setShowToast={setShowToast} showToast={showToast} />

      <DeleteAccount deleteUser={deleteUser} setDeleteUser={setDeleteUser} />
    </>
  );
};
export default Profile;
