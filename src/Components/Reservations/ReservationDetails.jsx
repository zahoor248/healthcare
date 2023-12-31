import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/reservation.png";
import User from "../../assets/images/holderpic.jpeg";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonPrimaryButton from "../CommonPrimaryButton";
import { db } from "../../firebase";
const ReservationDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [reservationDetails, setReservationDetails] = useState([]);
  const [opentoAcceptoffer, setOpenToAcceptOffer] = useState([]);
  const [terms, setTerms] = useState({
    toggle: false,
    termsText: "",
  });
  const reservations = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    loadDetails();
    console.log(user.uuid);
  }, [location, user]);

  const handleReviewSubmit = () => {
    handleAPIRequest("POST", `accept-offer/${location.search.split("?")[1]}`, {
      additional_terms: "",
    })
      .then((response) => {
        setTerms({ ...terms, toggle: false });
        loadDetails();

        navigate("/contracts");
      })
      .catch((error) => {});
  };

  const loadDetails = () => {
    handleAPIRequest(
      "get",
      `reservation/${location.search.split("?")[1]}`,
      null
    )
      .then((response) => {
        if (response.data) {
          let parentReservation = [response.data.reservation];

          let counterOffers = response.data.reservation.counterOffers;

          if (counterOffers.length) {
            counterOffers.map((item) => {
              parentReservation.push(item);
            });
          }

          let opentoAcceptoffer = parentReservation.filter(
            (item) => item.status === "open"
          );
          console.log(opentoAcceptoffer);
          setOpenToAcceptOffer(opentoAcceptoffer[0]);

          setReservationDetails(
            parentReservation.filter((item) => item.status != "open")
          );
        } else {
          setReservationDetails(response);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div className="flex main-container overflow-auto w-full">
      <div className="flex w-full flex-col  py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl font-semibold text-neutral-800">
            Offer Details
          </div>
        </div>

        {!loading ? (
          <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
            <div className="border-neutral-900  h-fit w-full flex  flex-col  hover:shadow-sm  rounded-xl">
              {" "}
              <div className="font-semibold text-[#2676BC] relative w-fit text-xl flex items-center gap-1">
                {" "}
                Current Offer:
                {/* <div className="  absolute -right-28 px-6 bg-blue-50 !text-blue-600 border-blue-600 capitalize border rounded-full py-[2px] text-sm">
                  {reservationDetails.status}
                </div> */}
              </div>
              <div className="flex justify-start relative shadow-class rounded-xl p-6  mt-6 flex-col ">
                <div className="  absolute right-0 -mt-0 md:-mt-3 px-6  text-green-600  capitalize flex items-center rounded-full py-[2px] ">
                  <p className="font-semibold pr-1 text-neutral-700 text-lg">
                    Status:
                  </p>{" "}
                  {opentoAcceptoffer?.status}
                </div>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
                  <div className="flex flex-col items-start gap-4 w-full md:w-[40%] ">
                    {/* Date here  */}
                    <div className="flex items-center text-neutral-700 bg-[#EFF4F8] p-2 md:p-4 rounded-sm flex-row gap-2 md:gap-3 w-full">
                      <div className="p-2 flex justify-center items-center h-fit rounded-full bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563eb"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-calendar-days"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                      </div>
                      <div className=" flex flex-col w-full md:w-fit">
                        <span className=" text-neutral-600">Date</span>
                        <div className="flex w-full justify-between md:w-fit md:justify-start">
                          <p className="font-semibold text-sm md:text-base">
                            {dayjs(opentoAcceptoffer.start_date, {
                              format: "DD/MM/YYYY",
                            }).format("MMM. DD, YYYY")}
                          </p>
                          <span className="px-2">-</span>
                          <p className="font-semibold text-sm md:text-base">
                            {dayjs(opentoAcceptoffer.end_date, {
                              format: "DD/MM/YYYY",
                            }).format("MMM. DD, YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* location here  */}
                    <div className="flex justify-start w-full flex-col gap-1">
                      <div className="font-semibold flex items-center gap-1">
                        <svg
                          width="11"
                          height="14"
                          viewBox="0 0 11 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.91335 13.6854C7.31972 11.9254 10.5272 7.65967 10.5272 5.26362C10.5272 2.35766 8.16958 0 5.26362 0C2.35766 0 0 2.35766 0 5.26362C0 7.65967 3.20752 11.9254 4.61389 13.6854C4.95109 14.1049 5.57615 14.1049 5.91335 13.6854ZM5.26362 3.50908C6.23263 3.50908 7.01816 4.29462 7.01816 5.26362C7.01816 6.23263 6.23263 7.01816 5.26362 7.01816C4.29462 7.01816 3.50908 6.23263 3.50908 5.26362C3.50908 4.29462 4.29462 3.50908 5.26362 3.50908Z"
                            fill="#2174FF"
                          />
                        </svg>

                        <span className="font-normal text-sm md:text-base text-neutral-500">
                          Location:
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap pl-1 font-semibold text-blue-700 capitalize">
                        {opentoAcceptoffer?.location}
                      </p>
                    </div>
                  </div>

                  {/* reservation offer section  */}
                  <div className="w-[60%]">
                    {opentoAcceptoffer?.offered_by_me ? (
                      <>
                        <Link
                          to={
                            opentoAcceptoffer.offered_to?.uuid != user.uuid &&
                            (opentoAcceptoffer.offered_to?.type === "pro" &&
                            user.type === "bus"
                              ? `/profile-details?${opentoAcceptoffer.offered_to?.uuid}`
                              : `/bussiness-profile-details?${opentoAcceptoffer.offered_to?.uuid}`)
                          }
                          className=" !rounded-full overflow-hidden w-10 h-10"
                        >
                          <div className="flex items-start gap-4 flex-col w-full">
                            <div className=" capitalize font-semibold text-xl text-neutral-600">
                              ${opentoAcceptoffer?.pay_rate}{" "}
                              {opentoAcceptoffer?.pay_duration} offer to:
                              {/* <GoPrimitiveDot className='online-icon'/> */}
                            </div>

                            <div className="flex items-center gap-4">
                              <div className=" !rounded-full border overflow-hidden w-10 h-10">
                                {opentoAcceptoffer.offered_to?.photo_url !=
                                null ? (
                                  <img
                                    src={
                                      opentoAcceptoffer.offered_to?.photo_url
                                    }
                                  />
                                ) : (
                                  <img src={User} />
                                )}
                                {/* <GoPrimitiveDot className='online-icon'/> */}
                              </div>
                              <div className="">
                                <p className="font-medium text-base text-neutral-500 capitalize">
                                  {opentoAcceptoffer?.offered_to?.firstname}{" "}
                                  {opentoAcceptoffer?.offered_to?.lastname}
                                </p>
                                <p className="text-sm pt-2">
                                  {opentoAcceptoffer?.offered_to?.about_me ||
                                    "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    ) : (
                      <Link
                        to={
                          opentoAcceptoffer.offered_by?.uuid != user.uuid &&
                          (opentoAcceptoffer.offered_by?.type === "pro" &&
                          user.type === "bus"
                            ? `/profile-details?${opentoAcceptoffer.offered_by?.uuid}`
                            : `/bussiness-profile-details?${opentoAcceptoffer.offered_to?.uuid}`)
                        }
                        className=" !rounded-full overflow-hidden w-10 h-10"
                      >
                        <div className="flex items-start gap-4 flex-col w-full">
                          <div className=" capitalize font-bold text-lg text-neutral-600">
                            ${opentoAcceptoffer?.pay_rate}{" "}
                            {opentoAcceptoffer?.pay_duration} offer by:
                            {/* <GoPrimitiveDot className='online-icon'/> */}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className=" !rounded-full border overflow-hidden w-10 h-10">
                              {opentoAcceptoffer.offered_by?.photo_url !=
                              null ? (
                                <img
                                  src={opentoAcceptoffer.offered_by?.photo_url}
                                />
                              ) : (
                                <img src={User} />
                              )}
                              {/* <GoPrimitiveDot className='online-icon'/> */}
                            </div>
                            <div className="">
                              <p className="font-semibold text-base text-neutral-600 capitalize">
                                {opentoAcceptoffer?.offered_by?.firstname}{" "}
                                {opentoAcceptoffer?.offered_by?.lastname}
                              </p>
                              <p className="text-sm pt-2">
                                {opentoAcceptoffer?.offered_by?.about_me ||
                                  "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    <div className="flex flex-row gap-3 pt-8">
                      <div className="font-semibold text-blue-600">
                        Description:
                      </div>
                      <p className="text-neutral-500">
                        {opentoAcceptoffer?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full justify-end pt-6 mt-6 border-t">
                  <div
                    onClick={() => {
                      if (opentoAcceptoffer.offered_by_me) {
                        db.collection("Chats")
                          .get()
                          .then((snap) => {
                            if (snap.size !== 0) {
                              snap.forEach((i) => {
                                const users = i.data().users;

                                // Check if both user UUIDs exist in the same users array
                                const bothUsersExist =
                                  users.some(
                                    (e) =>
                                      e.uuid ===
                                      opentoAcceptoffer.offered_to.uuid
                                  ) && users.some((e) => e.uuid === user.uuid);

                                if (bothUsersExist) {
                                  navigate("/chats", {
                                    state: {
                                      chatId: i.id,
                                      userId: opentoAcceptoffer.offered_to.uuid,
                                    },
                                  });
                                } else {
                                  navigate("/chats", {
                                    state: {
                                      userId: opentoAcceptoffer.offered_to.uuid,
                                    },
                                  });
                                }
                              });
                            } else {
                              navigate("/chats", {
                                state: {
                                  userId: opentoAcceptoffer.offered_to.uuid,
                                },
                              });
                            }
                          });
                      } else {
                        db.collection("Chats")
                          .get()
                          .then((snap) => {
                            if (snap.size !== 0) {
                              snap.forEach((i) => {
                                const users = i.data().users;

                                // Check if both user UUIDs exist in the same users array
                                const bothUsersExist =
                                  users.some(
                                    (e) =>
                                      e.uuid ===
                                      opentoAcceptoffer.offered_by.uuid
                                  ) && users.some((e) => e.uuid === user.uuid);

                                if (bothUsersExist) {
                                  navigate("/chats", {
                                    state: {
                                      chatId: i.id,
                                      userId: opentoAcceptoffer.offered_by.uuid,
                                    },
                                  });
                                } else {
                                  navigate("/chats", {
                                    state: {
                                      userId: opentoAcceptoffer.offered_by.uuid,
                                    },
                                  });
                                }
                              });
                            } else {
                              navigate("/chats", {
                                state: {
                                  userId: opentoAcceptoffer.offered_by.uuid,
                                },
                              });
                            }
                          });
                      }
                    }}
                  >
                    <CommonPrimaryButton loading={false} text={"Chat"} />
                  </div>

                  {opentoAcceptoffer?.offered_by_me === false &&
                    opentoAcceptoffer?.status === "open" && (
                      <>
                        <div
                          onClick={() =>
                            setTerms({ ...terms, toggle: !terms.toggle })
                          }
                        >
                          <CommonPrimaryButton
                            loading={false}
                            text={"Accept"}
                          />
                        </div>

                        <Link to={`/counter-offer?${opentoAcceptoffer?.uuid}`}>
                          <CommonPrimaryButton
                            loading={false}
                            text={"Counter"}
                          />
                        </Link>
                      </>
                    )}
                </div>
              </div>
              {reservationDetails?.length > 0 && (
                <>
                  <div className="w-full border-t my-10" />
                  <div className="text-2xl font-semibold text-center text-neutral-800">
                    Offer History
                  </div>
                </>
              )}
              {reservationDetails
                ?.sort(
                  (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                )
                .map((item, index) => (
                  <div className="flex  justify-start w-full flex-col ">
                    <div
                      className={`flex  flex-row gap-3 md:gap-6 mt-6 ${
                        index % 2 != 1 ? "justify-start" : "justify-end"
                      }`}
                    >
                      {index % 2 != 1 && (
                        <img
                          className="w-10 border rounded-full h-10 flex justify-center items-center"
                          src={User}
                        />
                      )}{" "}
                      {index % 2 === 1 ? (
                        <div
                          className={`flex w-[85%] relative flex-col md:flex-row gap-8 md:gap-12 p-4 md:p-7 shadow-class rounded-lg ${
                            index % 2 === 1 ? "items-start" : "items-end"
                          }`}
                        >
                          <div className="flex justify-between flex-col  gap-3 w-full md:w-fit">
                            {/* Date here  */}
                            <div className="flex items-center text-neutral-700 bg-[#EFF4F8] p-2 md:p-4 rounded-sm flex-row gap-2 md:gap-3 w-full">
                              <div className="p-2 flex justify-center items-center h-fit rounded-full bg-blue-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#2563eb"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-calendar-days"
                                >
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                    ry="2"
                                  />
                                  <line x1="16" x2="16" y1="2" y2="6" />
                                  <line x1="8" x2="8" y1="2" y2="6" />
                                  <line x1="3" x2="21" y1="10" y2="10" />
                                  <path d="M8 14h.01" />
                                  <path d="M12 14h.01" />
                                  <path d="M16 14h.01" />
                                  <path d="M8 18h.01" />
                                  <path d="M12 18h.01" />
                                  <path d="M16 18h.01" />
                                </svg>
                              </div>
                              <div className=" flex flex-col">
                                <span className=" text-neutral-600">Date</span>
                                <div className="flex">
                                  <p className="font-semibold text-sm md:text-base">
                                    {dayjs(item.start_date, {
                                      format: "DD/MM/YYYY",
                                    }).format("MMM. DD, YYYY")}
                                  </p>
                                  <span className="px-2">-</span>
                                  <p className="font-semibold text-sm md:text-base">
                                    {dayjs(item.end_date, {
                                      format: "DD/MM/YYYY",
                                    }).format("MMM. DD, YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start w-full flex-col gap-1">
                              <div className="font-semibold flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="#2563eb"
                                  stroke="#ffff"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-map-pin"
                                >
                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                  <circle
                                    cx="12"
                                    cy="10"
                                    r="2"
                                    fill="#ffffff"
                                  />
                                </svg>

                                <span className="font-normal text-sm md:text-base text-neutral-500">
                                  Location:
                                </span>
                              </div>
                              <p className="whitespace-pre-wrap pl-1 font-semibold text-blue-700 capitalize">
                                {item?.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:pt-3 gap-4">
                            <div className="font-semibold text-xl text-blue-600">
                              Counter Offer:{" "}
                              <span className="text-neutral-700 capitalize">
                                ${item?.pay_rate} {item?.pay_duration}
                              </span>
                            </div>
                            <div className="font-bold flex items-center gap-4  text-xl">
                              <div className="text-blue-600 text-xl"> to:</div>{" "}
                              <div className="flex items-center gap-4">
                                <Link
                                  to={
                                    item.offered_to?.uuid != user.uuid &&
                                    `/bussiness-profile-details?${item.offered_to?.uuid}`
                                  }
                                  className=" !rounded-full border overflow-hidden w-10 h-10"
                                >
                                  {item?.offered_to?.photo_url != null ? (
                                    <img src={item?.offered_to?.photo_url} />
                                  ) : (
                                    <img src={User} />
                                  )}
                                  {/* <GoPrimitiveDot className='online-icon'/> */}
                                </Link>
                                <div className="">
                                  <p className="font-semibold text-base text-neutral-600 capitalize">
                                    {item?.offered_to?.firstname}{" "}
                                    {item?.offered_to?.lastname}
                                  </p>
                                  <p className="text-sm pt-2">
                                    {item?.offered_to?.about_me || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="  md:absolute md:right-0 md:top-3 px-6  text-green-600  capitalize flex items-center justify-end w-full rounded-full py-[2px] ">
                              <p className="font-semibold  text-neutral-700 text-lg">
                                Status:
                              </p>{" "}
                              {item.status}
                            </div>
                            <div className="flex justify-start">
                              Notes:
                              <p className="">{item?.offered_to?.about_me}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`flex w-[85%] relative flex-col md:flex-row gap-8 md:gap-12 p-4 md:p-7 shadow-class rounded-lg ${
                            index % 2 === 1 ? "items-start" : "md:items-end"
                          }`}
                        >
                          <div className="flex justify-between flex-col  gap-3 w-full md:w-fit">
                            {/* Date here  */}
                            <div className="flex items-center text-neutral-700 bg-[#EFF4F8] p-2 md:p-4 rounded-sm flex-row gap-2 md:gap-3 w-full">
                              <div className="p-2 flex justify-center items-center h-fit rounded-full bg-blue-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#2563eb"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-calendar-days"
                                >
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                    ry="2"
                                  />
                                  <line x1="16" x2="16" y1="2" y2="6" />
                                  <line x1="8" x2="8" y1="2" y2="6" />
                                  <line x1="3" x2="21" y1="10" y2="10" />
                                  <path d="M8 14h.01" />
                                  <path d="M12 14h.01" />
                                  <path d="M16 14h.01" />
                                  <path d="M8 18h.01" />
                                  <path d="M12 18h.01" />
                                  <path d="M16 18h.01" />
                                </svg>
                              </div>
                              <div className=" flex flex-col">
                                <span className=" text-neutral-600">Date</span>
                                <div className="flex">
                                  <p className="font-semibold text-sm md:text-base">
                                    {dayjs(item.start_date, {
                                      format: "DD/MM/YYYY",
                                    }).format("MMM. DD, YYYY")}
                                  </p>
                                  <span className="px-2">-</span>
                                  <p className="font-semibold text-sm md:text-base">
                                    {dayjs(item.end_date, {
                                      format: "DD/MM/YYYY",
                                    }).format("MMM. DD, YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start w-full flex-col gap-1">
                              <div className="font-semibold flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="#2563eb"
                                  stroke="#ffff"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-map-pin"
                                >
                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                  <circle
                                    cx="12"
                                    cy="10"
                                    r="2"
                                    fill="#ffffff"
                                  />
                                </svg>

                                <span className="font-normal text-sm md:text-base text-neutral-500">
                                  Location:
                                </span>
                              </div>
                              <p className="whitespace-pre-wrap pl-1 font-semibold text-blue-700 capitalize">
                                {item?.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start pt-3 gap-4">
                            <div className="font-semibold text-xl text-blue-600">
                              Counter Offer:{" "}
                              <span className="text-neutral-700 capitalize">
                                ${item?.pay_rate} {item?.pay_duration}
                              </span>
                            </div>
                            <div className="font-bold flex items-center gap-4  text-xl">
                              <div className="text-blue-600 text-xl"> to:</div>{" "}
                              <div className="flex items-center gap-4">
                                <Link
                                  to={
                                    item.offered_to?.uuid != user.uuid &&
                                    (user.type == "pro"
                                      ? `/bussiness-profile-details?${item.offered_to?.uuid}`
                                      : `/profile-details?${item.offered_to?.uuid}`)
                                  }
                                  className=" !rounded-full border overflow-hidden w-10 h-10"
                                >
                                  {item?.offered_by?.photo_url != null ? (
                                    <img src={item?.offered_by?.photo_url} />
                                  ) : (
                                    <img src={User} />
                                  )}
                                  {/* <GoPrimitiveDot className='online-icon'/> */}
                                </Link>
                                <div className="">
                                  <p className="font-semibold text-base text-neutral-600 capitalize">
                                    {item?.offered_by?.firstname}{" "}
                                    {item?.offered_by?.lastname}
                                  </p>
                                  <p className="text-sm pt-2">
                                    {item?.offered_by?.about_me || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="  md:absolute md:right-0 md:top-3 px-6  text-green-600  capitalize flex items-center justify-end w-full rounded-full py-[2px] ">
                              <p className="font-semibold  text-neutral-700 text-lg">
                                Status:
                              </p>{" "}
                              {item.status}
                            </div>
                            <div className="flex justify-start">
                              Notes:
                              <p className="">{item?.offered_by?.about_me}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {index % 2 == 1 && (
                        <img
                          className="w-10 border rounded-full h-10 flex justify-center items-center"
                          src={User}
                        />
                      )}{" "}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
            <img src={emptyState} className="w-32" />
            <div className="text-3xl ">Your reservations will appear here</div>
          </div>
        )}
      </div>

      {terms.toggle && (
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"></div>
      )}
      {terms.toggle && (
        <div className="h-screen inset-0 flex justify-center items-center w-full fixed z-50  m-auto">
          <div className="w-full max-w-[600px] flex flex-col fixed justify-start items-start p-8 z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
            <div className="text-xl pb-4">{"Legal Agreement"}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                {/* <p className="text-base mt-2 text-neutral-600">
                  Additional Terms
                </p> */}
                <p
                  className="text-md placeholder-[#B8C0CB] text-neutral-800 py-3  rounded w-full"
                  value={terms.termsText}
                  onChange={(e) =>
                    setTerms({ ...terms, termsText: e.target.value })
                  }
                  placeholder="Write Something"
                  variant="outlined"
                >
                  By clicking "Accept Now", you agree that you are creating a
                  binding legal contract. You may terminate this agreement
                  within 48 hours of the start date. Failure to fulfill the
                  obligations in this agreement will constitute a breech of
                  contract for which HealthcareUp, in its sole discretion may
                  suspend your account.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full justify-end mt-8">
              {" "}
              <button
                onClick={() => setTerms({ ...terms, toggle: false })}
                className="px-6 py-3 text-[#0f75bc] hover:bg-[#0f75bc]/20 transition-all ease-in-out duration-500 rounded-md"
              >
                Cancel
              </button>
              <CommonPrimaryButton
                onClick={() => handleReviewSubmit()}
                loading={false}
                text={"Accept Now"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
