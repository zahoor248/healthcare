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
    <div className="flex w-full">
      <div className="w-full">
        <img src={Slide1} />
      </div>
      <div className="w-full">
        <div className="">
          <img src={LogoImage} alt="" />
        </div>

        <div className="">
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>

        <div>
          <div >
            <TextField
              className=""
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="" />
          </div>
          <div >
            <TextField
              className=""
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="" />
          </div>

          <div >
            <TextField
              className=""
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdAlternateEmail className="" />
          </div>

          <div >
            <TextField
              className=""
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiLock className="" />
          </div>

          <div >
            <TextField
              className=""
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <BiLock className="" />
          </div>

          <div >
            <TextField
              className=""
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <AiOutlinePhone className="" />
          </div>

          <div >
            <TextField
              className=""
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <IoLocationOutline className="" />
          </div>

          <div >
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
    </div>
  );
}