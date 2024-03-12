import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./ProfileDetails.css";
import { AiOutlineStar, AiFillStar, AiOutlineIdcard } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import { FaMapPin, FaStar } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import emptyState from "../../assets/images/add-to-wishlist-icon-1.jpg";
import User from "../../assets/images/holderpic.jpeg";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import DaySelect from "../DaySelect/DaySelect";
import Header from "../Header/Header";
import CommonInput from "../ReusableComponents/CommonInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Alert, Box } from "@mui/material";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav } from "../../Store/Actions/Actions";
import dayjs from "dayjs";
import Toast from "../AppLoader";
import CommonPrimaryButton from "../CommonPrimaryButton";
import { db } from "../../firebase";

import Autocomplete from "react-google-autocomplete";

const BusinessProfile = () => {
  const location = useLocation();

  const [showModel, setShowModel] = useState(false);

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["formatted_address"],
    types: ["establishment"],
  };

  const [chatId, setChatId] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const professionals = useSelector((state) => state.pros);
  const [cleared, setCleared] = useState(false);
  const [ratting, setRatting] = useState([]);
  const [counterLocation, setLocation] = useState("");
  const [payDuration, setPayDuration] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });

  // co
  useEffect(() => {
    let filter_user = [...professionals];
    let route_uuid = location.search.split("?")[1];
    let getuser = filter_user.find((temp) => temp.uuid === route_uuid);
    handleAPIRequest("get", `bus/${route_uuid}`, null)
      .then((response) => {
        console.log(response, "here is res");

        if (response?.data?.user?.accounts[0]?.bus_profile) {
          setUserDetails(response?.data?.user?.accounts[0]?.bus_profile);
        } else {
          setUserDetails(null);
        }
        // setUserDetails(response?.data?.user);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <div class="boxes">
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {userDetails === null ? (
            <div className="flex w-[60%] justify-center mx-auto flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
              <img
                src={
                  "https://thenounproject.com/api/private/icons/4474310/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageF"
                }
                className="w-40  rounded-full bg-transparent"
              />
              <div className="text-3xl "> Profile Not Found</div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col xl:flex-row border-b">
                <div className="basis-2/5 pt-12 col-span-2">
                  <div className=" flex w-full gap-6 pl-20 items-center ">
                    {userDetails.logo_url != null ? (
                      <img
                        className="w-28 h-28 flex justify-center capitalize rounded-xl shadow-class items-center bg-slate-700 text-xl font-thin object-cover text-white"
                        src={userDetails.logo_url}
                      />
                    ) : (
                      <div className="w-28 h-28 flex justify-center capitalize rounded-xl shadow-class items-center bg-slate-700 text-xl font-thin text-white">
                        {userDetails?.company_name}
                      </div>
                    )}
                    <div className=" mt-4">
                      <p className="profile-user-name capitalize text-2xl text-blue-900">
                        {userDetails?.company_name}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-blue-300 w-full mt-12"></div>

                  <div className="">
                    <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-4 2xl:gap-0 pl-20 mt-10 mb-10">
                      <div className="flex flex-col"></div>

                      {/* <div className="border-right"></div> */}

                      <div className="profile-column2">
                        <div className="rating-section">
                          <TbPhoneCall className="dollar-icon" />
                          <div className="rating-text">
                            <p className="rating-heading">Phone</p>
                            <p className="license-areas">
                              {" "}
                              {userDetails?.public_phone
                                ? userDetails?.public_phone
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div
                          className="rating-section"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <CgWebsite className="pin-icon" />
                          <div className="rating-text">
                            <p className="rating-heading">Website</p>
                            <p className="license-areas">
                              {userDetails?.website_url ? (
                                <a
                                  href={userDetails.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {userDetails.website_url}
                                </a>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-about-text ">
                  <div className="about-text ">
                    <h3>About {userDetails?.company_name}</h3>
                    <p className="about-pro-desc">
                      {userDetails?.about == null
                        ? `${userDetails?.about} has not added description yet.`
                        : userDetails?.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Toast setShowToast={setShowToast} showToast={showToast} />
    </>
  );
};
export default BusinessProfile;
