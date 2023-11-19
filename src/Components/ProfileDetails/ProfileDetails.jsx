import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import { AiOutlineStar, AiFillStar, AiOutlineIdcard } from "react-icons/ai";
import { TbCurrencyDollar } from "react-icons/tb";
import { FaMapPin } from "react-icons/fa";

import ReviewSlider from "../ReviewSlider/ReviewSlider";
import DaySelect from "../DaySelect/DaySelect";
import Header from "../Header/Header";
import CommonInput from "../ReusableComponents/CommonInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Alert, Box } from "@mui/material";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav } from "../../Store/Actions/Actions";
import dayjs from "dayjs";
import Toast from "../AppLoader";

export default function ProfileDetails() {
  const location = useLocation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(true);

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
    handleAPIRequest("get", `pros/${route_uuid}`, null)
      .then((response) => {
        console.log(response, "here is res");
        setUserDetails(response?.data?.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    console.log(location);
    console.log(getuser);
  }, [professionals]);

  const reserveUser = () => {
    let data = {
      uuid: location.search.split("?")[1],
      start_date: startDate,
      end_date: endDate,
      pay_rate: price,
      pay_duration: payDuration?.toLowerCase(),
      location: counterLocation,
      description: description,
      account_uuid: user.accounts[0].uuid,
    };
    console.log(data);

    handleAPIRequest("POST", `reservation`, data)
      .then((response) => {
        console.log(response);
      })
      .catch({});

    console.log(data, "here is the payload ");
  };

  const handleAddFav = (item) => {
    handleAPIRequest("POST", `favorites/add/${item.id}`, null)
      .then((response) => {
        console.log(response, "Helelelelelelele");
        dispatch(getAllFav(response.favorites));

        setShowToast({
          ...showToast,
          toggle: true,
          status: "info",
          message: "This user has been added to favorites",
          lable: "Added as Favorites",
        });

        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "info",
            message: "This user has been added to favorites",
            lable: "Added as Favorites",
          });
        }, 2000);
      })
      .catch((error) => {});
  };

  const handleStartDateChange = (date) => {
    setStartDate(dayjs(date).format("DD-MM-YYYY"));
  };
  const handleEndDateChange = (date) => {
    setEndDate(dayjs(date).format("DD-MM-YYYY"));
  };
  return (
    <>
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <svg viewBox="0 0 240 240" height="240" width="240" class="pl">
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-330"
              stroke-dasharray="0 660"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--a"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-110"
              stroke-dasharray="0 220"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--b"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              class="pl__ring pl__ring--c"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              class="pl__ring pl__ring--d"
            ></circle>
          </svg>
        </div>
      ) : (
        <div>
          <div className="flex flex-col xl:flex-row shadow-md">
            <div className="basis-2/5 pt-12 col-span-2">
              <div style={{ display: "flex", paddingLeft: "5rem" }}>
                <div className="border border-gray-300 w-40 h-40 bg-gray-300 rounded-lg"></div>
                <div className="ml-8 mt-4">
                  <p className="profile-user-name capitalize text-2xl text-blue-900">
                    {userDetails?.firstname} {userDetails?.lastname}
                  </p>
                  <p className="profile-designation text-sm text-gray-300 mt-1">
                    ADON
                  </p>
                  <button
                    onClick={() => handleAddFav(userDetails)}
                    className="contact-profile-btn text-blue-700 border border-blue-700 rounded-md py-1.5 px-4 mt-6 cursor-pointer hover:border-blue-900 hover:bg-white hover:text-blue-700 transition-all ease-in-out duration-500"
                  >
                    Add to Favourites
                  </button>
                  <Link to={`/chats?${userDetails?.uuid}`}>
                    <button className="contact-profile-btn mx-3 text-white bg-blue-700 border border-blue-700 rounded-md py-1.5 px-4 mt-6 cursor-pointer hover:border-blue-900 hover:bg-white hover:text-blue-700 transition-all ease-in-out duration-500">
                      Contact this Pro
                    </button>
                  </Link>
                </div>
              </div>

              <div className="border-b border-blue-300 w-full mt-12"></div>

              <div className="">
                <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-4 2xl:gap-0 pl-20 mt-10 mb-10">
                  <div className="flex flex-col">
                    <div className="flex">
                      <AiOutlineStar className="star-icon" />
                      <div className="ml-4">
                        <p className="text-lg text-gray-600 mb-2">Ratings</p>
                        <div className="flex">
                          {userDetails?.reviews?.length ? (
                            <div>
                              {userDetails?.reviews?.map((item) => (
                                <AiFillStar
                                  style={{
                                    fontSize: "1.2rem",
                                    color: "#F2BC27",
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex" style={{ marginTop: "1.5rem" }}>
                      <AiOutlineIdcard className="text-[2.5rem] text-blue-700" />
                      <div className="ml-4">
                        <p className="rating-heading">Licensed in</p>
                        {userDetails?.licenses?.length ? (
                          <div className="flex gap-1">
                            {userDetails?.licenses?.map((item) => (
                              <p className="license-areas">{item?.abbrev}</p>
                            ))}
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-right"></div>

                  <div className="profile-column2">
                    <div className="rating-section">
                      <TbCurrencyDollar className="dollar-icon" />
                      <div className="rating-text">
                        <p className="rating-heading">Rates</p>
                        <p className="license-areas">
                          {" "}
                          {userDetails?.pro_profile
                            ? `$${userDetails?.pro_profile?.daily_rate}/day $${userDetails?.pro_profile?.hourly_rate}/hour`
                            : "0"}
                        </p>
                      </div>
                    </div>

                    <div
                      className="rating-section"
                      style={{ marginTop: "1.5rem" }}
                    >
                      <FaMapPin className="pin-icon" />
                      <div className="rating-text">
                        <p className="rating-heading">Radius</p>
                        <p className="license-areas">
                          {" "}
                          {userDetails?.pro_profile?.radius
                            ? `${userDetails?.pro_profile?.radius} miles away`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-about-text ">
              <div className="about-text">
                <h3>About {userDetails?.firstname}</h3>
                <p className="about-pro-desc">
                  {userDetails?.about_me == null
                    ? `${userDetails?.firstname} has not added description yet.`
                    : userDetails?.about_me}
                </p>
              </div>
            </div>

            <div className="profile-working-hours ">
              <div className="working-hrs-space"></div>
              <p className="working-hrs">Preferred Working Hours</p>
              {userDetails?.pro_profile?.working_hours.map((item) => (
                <div className="working-day-section w-full">
                  <div
                    className="responsive-days w-full xl:w-[12rem]"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="days-container w-full">{item.name}</div>
                  </div>

                  <div
                    className="responsive-hrs w-full xl:w-[14rem]"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="hrs-container w-full">
                      <p>
                        {item?.fromTime
                          ? item?.fromTime + "-"
                          : "Not available "}{" "}
                        {item?.toTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <h3 className="review-heading ml-20">Select:</h3>
            <div className="w-[80vw] bg-white px-10 py-8 rounded-md mx-auto mt-10 flex flex-col gap-5  ">
              <div className="flex gap-6">
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                    Start Date
                  </p>
                  <div className="relative w-full">
                    <LocalizationProvider
                      className="w-full"
                      dateAdapter={AdapterDayjs}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          sx={{ width: "100%" }}
                          onChange={handleStartDateChange}
                          defaultValue={startDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                    End Date
                  </p>
                  <div className="relative w-full">
                    <LocalizationProvider
                      className="w-full"
                      dateAdapter={AdapterDayjs}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          sx={{ width: "100%" }}
                          onChange={handleEndDateChange}
                          defaultValue={endDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                  Location
                </p>
                <div className="relative w-full">
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    value={counterLocation}
                    placeholder="Select Location"
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  />
                </div>
              </div>
              <div className="flex gap-8 flex-col">
                <div className="flex gap-2 ">
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Rate
                    </p>
                    <div className="relative w-full">
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter Value"
                        type="number"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  /{" "}
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Rate
                    </p>
                    <div className="relative w-full">
                      <select
                        onChange={(e) => setPayDuration(e.target.value)}
                        className="text-lg bg-transparent placeholder-[#B8C0CB] text-neutral-800 py-[15px] -mt-0.5 focus:outline-none px-4 border border-[#C2C9D4] rounded w-full"
                      >
                        <option>Hourly</option>
                        <option>Daily</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div>
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Description
                    </p>
                    <div className="relative w-full">
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Describe your self"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  <div className="w-auto flex justify-end items-end mt-4">
                    <button
                      onClick={() => reserveUser()}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white"
                    >
                      Send Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="review-section-container">
            <div className="slides-container">
              {userDetails?.reviewer?.map((item) => (
                <div className="slide1">
                  <div style={{ display: "flex" }}>
                    <div className="slide-image-container"></div>
                    <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
                      <p className="user-review">
                        {" "}
                        {item?.reviewer?.firstname} {item?.reviewer?.lastname}
                      </p>
                      <div style={{ marginTop: ".5rem" }} className="flex">
                        <AiFillStar className="review-stars" />
                        <AiFillStar className="review-stars" />
                        <AiFillStar className="review-stars" />
                        <AiFillStar className="review-stars" />
                        <AiFillStar className="review-stars" />
                      </div>
                    </div>
                  </div>
                  <p className="review-desc w-full break-words">
                    {item.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </>
  );
}
