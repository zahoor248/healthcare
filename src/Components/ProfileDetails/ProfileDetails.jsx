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
import CommonPrimaryButton from "../CommonPrimaryButton";

export default function ProfileDetails() {
  const location = useLocation();
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
    setButtonLoading(true);
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
        setShowToast({
          ...showToast,
          toggle: true,
          status: "info",
          message: "This user has been Reserved",
          lable: "Reservation Booked",
        });

        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "info",
            message: "This user has been Reserved",
            lable: "Reservation Booked",
          });
        }, 2000);

        setButtonLoading(false);
      })
      .catch((error) => {
        setShowToast({
          ...showToast,
          toggle: true,
          status: "error",
          message: "Please try again later",
          lable: "Server Error",
        });

        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "error",
            message: "Please try again later",
            lable: "Server Error",
          });
        }, 2000);
        setButtonLoading(false);
      });

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
        <div>
          <div className="flex flex-col xl:flex-row border-b">
            <div className="basis-2/5 pt-12 col-span-2">
              <div className=" flex w-full gap-6 pl-20 items-center ">
                {userDetails.photo_url != null ? (
                  <img
                    className="w-28 h-28 flex justify-center capitalize rounded-xl shadow-class items-center bg-slate-700 text-xl font-thin object-cover text-white"
                    src={userDetails.photo_url}
                  />
                ) : (
                  <div className="w-28 h-28 flex justify-center capitalize rounded-xl shadow-class items-center bg-slate-700 text-xl font-thin text-white">
                    {userDetails?.firstname}
                  </div>
                )}
                <div className=" mt-4">
                  <p className="profile-user-name capitalize text-2xl text-blue-900">
                    {userDetails?.firstname} {userDetails?.lastname}
                  </p>
                  <p className="profile-designation text-sm text-gray-300 mt-1">
                    {userDetails?.licenses?.length ? (
                      <div className="flex gap-1">
                        {userDetails?.licenses?.map((item) => (
                          <p className="license-areas">{item?.abbrev},</p>
                        ))}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <CommonPrimaryButton
                      onClick={() => handleAddFav(userDetails)}
                      loading={false}
                      text={"Add to Favourites"}
                    />

                    <Link to={`/chats?${userDetails?.uuid}`}>
                      <CommonPrimaryButton
                        loading={false}
                        text={"Contact this Pro"}
                      />
                    </Link>
                  </div>
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
              <div className="about-text ">
                <h3>About {userDetails?.firstname}</h3>
                <p className="about-pro-desc">
                  {userDetails?.about_me == null
                    ? `${userDetails?.firstname} has not added description yet.`
                    : userDetails?.about_me}
                </p>
              </div>
            </div>

            <div className=" border-l">
              <p className="working-hrs">Preferred Working Hours</p>
              {userDetails?.pro_profile?.working_hours.length > 0 ? (
                <div className="w-full flex flex-col justify-center items-center">
                  {userDetails?.pro_profile?.working_hours.map((item) => (
                    <div className="flex px-4 py-2 border-t  w-full">
                      <div
                        className="responsive-days w-full xl:w-[12rem]"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="p-2 w-full">{item.name}</div>
                      </div>

                      <div className=" w-full xl:w-[14rem]">
                        <div className=" flex text-neutral-500 p-2 w-full">
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
              ) : (
                <div className="flex flex-col h-full justify-center text-neutral-800 font-normal items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#5c5c5c"
                      className="w-20 h-20 mb-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  Hours not available for this PRO
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center py-5 ">
            <h3 className=" text-neutral-800 text-3xl ">Book Reservation</h3>
            <div className="w-[80vw] bg-white px-10  rounded-md mx-auto mt-10 flex flex-col gap-5  ">
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
                    <CommonPrimaryButton
                      onClick={() => reserveUser()}
                      loading={buttonLoading}
                      text={"Send Reservation"}
                    />
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
