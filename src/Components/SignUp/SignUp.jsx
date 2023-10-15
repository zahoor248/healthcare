import React, { useEffect, useState } from "react";
import "./SignUp.css";
import LogoImage from "../../assets/images/logo-image.png";
import TextField from "@mui/material/TextField";
import { MdAlternateEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import GoogleIcon from "../../assets/images/google-icon.png";
import { AiOutlinePhone } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import Slide1 from "../../assets/images/slide1.png";
import axios from "axios";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { POST } from "../../Api/Post";
import { REGISTER } from "../../Api/EndPoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Actions/Actions";

import { components } from "react-select";

export default function SignUp() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [post, setPost] = useState([]);

  const registrationHandler = async () => {
    let data = {
      type: "pro",
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phoneNumber,
      password: password,
    };

    POST(data, REGISTER, "post")
      .then((response) => {
        console.log(response);
        setEmail("");
        dispatch(setUser(response.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {

  //     axios.get ('https://jsonplaceholder.typicode.com/posts')
  //     .then(response => {
  //         setPost ({
  //             posts: response.data
  //         })
  //         console.log(response.data)
  //     })
  //   });

  //   const {posts} = post

  return (
    <div className="flex w-full h-screen overflow-auto items-center">
      
      <div className="w-full gap-12 rounded-lg flex h-full">
        <div className="w-full bg-blue-200 h-full flex justify-center items-center">
          <img src={Slide1} className=" m-auto h-96 w-96" />
        </div>
        <div className="flex flex-col w-full gap-6 pt-20">
          <p className="text-3xl/none font-bold text-neutral-800 text-center">Heloo</p>
          <div className="w-full max-w-[500px] mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base/none font-semibold text-neutral-700">
                First Name
              </p>
              <input
                type="text"
                placeholder="First Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-4 px-8 border border-[#C2C9D4] rounded"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base/none font-semibold text-neutral-700">
                Last Name
              </p>
              <input
                type="text"
                placeholder="Last Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-4 px-8 border border-[#C2C9D4] rounded"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <p className="text-base/none font-semibold text-neutral-700">
                Email
              </p>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-4 px-8 border border-[#C2C9D4] rounded w-full"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-neutral-700 absolute top-[23px] right-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base/none font-semibold text-neutral-700">
                Password
              </p>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Please Enter Password"
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-4 px-8 border border-[#C2C9D4] rounded w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-neutral-700 absolute top-[23px] right-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="text-base/none font-semibold text-neutral-700">
                Confirm Password
              </p>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Please Confirm your Password"
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-4 px-8 border border-[#C2C9D4] rounded w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-neutral-700 absolute top-[23px] right-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-full bg-blue-100">
        <img src={Slide1} className=" m-auto h-96 w-96"/>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center mx-auto">
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl font-semibold text-neutral-900">Hello</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>

        <div className="w-full max-w-[340px] mx-auto">
          <div className="relative w-full">
            <TextField
              className="w-full"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="absolute inset-0 my-auto ml-auto right-4" />
          </div>
          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdAlternateEmail className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiLock className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <BiLock className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <AiOutlinePhone className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <IoLocationOutline className="absolute inset-0 my-auto ml-auto right-4" />
          </div>

          <div className="w-full border px-5 py-4 border-neutral-400">
            <select
              className=""
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>User Type</option>
              <option value={"pro"}>Professional</option>
              <option value={"bus"}>Business</option>
            </select>
          </div>

          <div className="">
            <button className="" onClick={registrationHandler}>
              Sign Up
            </button>
            <button className="">
              <img src={GoogleIcon} alt="Google Logo" />
              Sign Up with Google
            </button>
          </div>
        </div>

        <div className="">
          <p>
            Have an account ? <span className="">Sign In</span>
          </p>
        </div>

      </div> */}
      {/* <h1>List of Posts</h1>
      {
          posts && posts.map(post => 
          <div>
              {post.id}
              {post.title}
              {post.body}
          </div>
          )
      } */}
    </div>
  );
}
