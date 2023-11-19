import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import VerifiedBadge from "../../assets/images/verified-badge.png";
import emptyState from "../../assets/images/reservation.png";

import UserImage from "../../assets/images/avatar.png";
import { AiFillStar } from "react-icons/ai";
import "./ProfessionalCard.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BsBookmark } from "react-icons/bs";
import Avatar from "../../assets/images/avatar.png";
import VerifiedUser from "../../assets/images/icon-verified.png";
// import ReadMoreText from "../ReadMoreText/ReadMoreText";
import ModalReview from "../ModalReview/ModalReview";
import ReactPaginate from "react-paginate";
import { Modal } from "@mui/base";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import EmptyState from "../EmptyState/EmptyState";

export default function ProfessionalCard({ data, setFilteredData }) {
  const [show, setShow] = useState(null);
  const [profileData, setProfileData] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(null);
  const handleShow = (item) => {
    setShow(item.uuid);
    setProfileData(item);
    console.log(item, "here is the item");
  };

  const handlePageChange = (page) => {
    // Handle page change event
    setCurrentPage(page);
  };
  return (
    <>
      <div className="h-full">
        <div className="py-3 md:hidden  text-xl font-bold text-neutral-800">
          All Professionals:
        </div>
        {data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3  gap-6 2xl:gap-8 mt-6 md:mt-16">
            {" "}
            {data
              .slice((currentPage - 1) * 9, currentPage * 9)
              .map((item, index) => {
                return (
                  <div className="shadow-class hover:scale-105 transition-all ease-in-out duration-500 rounded-xl w-full">
                    {item.verified != "no" && (
                      <div className="verify-badge">
                        <img
                          src={require("../../assets/images/verified-badge.png")}
                          alt="Verification Badge"
                        />
                      </div>
                    )}
                    <div className="flex flex-col p-6 lg:p-6 2xl:p-10">
                      <div className="flex items-center">
                        <img
                          src={
                            item.photo_url
                              ? item.photo_url
                              : require("../../assets/images/avatar.png")
                          }
                          width={55}
                          height={32}
                          className="rounded-full object-cover w-10 md:w-8 md:h-8 h-10 2xl:w-16 2xl:h-16 xl:w-14 xl:h-14"
                          alt="User Image"
                        />
                        <div className="username-details">
                          <p className="text-neutral-700 font-bold md:text-md lg:text-base xl:text-md 2xl:text-xl capitalize">
                            {item.firstname} {item.lastname}
                          </p>
                          <p className="card-designation">{item.designation}</p>
                        </div>
                      </div>

                      <div className="flex flex-col py-4 xl:py-6 gap-3">
                        <div>
                          <span className="text-base text-blue-600">
                            Rates:
                          </span>{" "}
                          <span className="text-neutral-700 text-sm  2xl:text-lg font-medium">
                            {item.pro_profile
                              ? `$${item.pro_profile.daily_rate}/day $${item.pro_profile.hourly_rate}/hour`
                              : "0"}
                          </span>
                        </div>
                        <div>
                          <span
                            style={{ color: "#BE1E2D", marginRight: ".5rem" }}
                          >
                            Radius:
                          </span>{" "}
                          <span className="text-neutral-700 text-sm xl:text-lg font-medium">
                            {item.pro_profile?.radius
                              ? `${item.pro_profile?.radius} miles`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span
                            style={{ color: "#10274F", marginRight: ".5rem" }}
                          >
                            Ratings:
                          </span>{" "}
                          <span>
                            {item.pro_profile?.rating ? (
                              item.pro_profile.rating
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#F3E5AB"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="w-full">
                        <button
                          className="py-2 xl:py-3 border-neutral-500 border text-sm xl:text-md hover:border-neutral-700 transition-all ease-in-out duration-700 rounded-md hover:bg-neutral-100 w-full"
                          onClick={() => handleShow(item)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    {/* here is the model for the user detail  */}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 h-[60vh] bg-slate-50 rounded-md mt-8">
            <img src={emptyState} className="w-32" />
            <div className="text-3xl ">No Profile matches your search</div>
          </div>
        )}
        {show != null && show == profileData.uuid && (
          <div>
            <div className="fixed inset-0 w-full h-full !bg-black/60  backdrop-blur-sm z-30"></div>
            <div
              onClick={() => setShow(false)}
              className="w-full max-w-[700px] flex flex-col gap-6  z-[9999999] h-fit bg-white dark:bg-neutral-800 dark:border-none border-t box-border border-neutral-200 p-6 md:p-8 fixed inset-0 m-auto rounded"
            >
              <div
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6"
              >
                <svg
                  width="20"
                  className="text-neutral-800 dark:text-white cursor-pointer"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 15L15 5M5 5L15 15"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="flex w-full z-50 pt-5 flex-col">
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex flex-col px-10 pt-6 w-[50%]">
                      <div className="flex items-center flex-col gap-2">
                        <img
                          src={
                            profileData.photo_url
                              ? profileData.photo_url
                              : require("../../assets/images/avatar.png")
                          }
                          width={65}
                          height={32}
                          className="rounded-full object-cover w-20 h-20 "
                          alt="User Image"
                        />
                        <div className="">
                          <p className="text-neutral-900 font-semibold text-xl capitalize">
                            {profileData.firstname} {profileData.lastname}
                          </p>
                          <p className="card-designation">
                            {profileData.designation}
                          </p>
                        </div>
                      </div>
                      <div className="flex pt-2 items-start flex-col pb-2">
                        <div className="pb-2">
                          <span
                            style={{
                              color: "#1C75BC",
                              marginRight: ".5rem",
                            }}
                          >
                            Rates:
                          </span>{" "}
                          <span className="text-neutral-700 font-medium">
                            {profileData.pro_profile
                              ? `$${profileData.pro_profile.daily_rate}/day $${profileData.pro_profile.hourly_rate}/hour`
                              : "0"}
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              color: "#BE1E2D",
                              marginRight: ".5rem",
                            }}
                          >
                            Radius:
                          </span>{" "}
                          <span className="text-neutral-700 font-medium">
                            {profileData.pro_profile?.radius
                              ? `${profileData.pro_profile?.radius} miles`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex pt-2 flex-col gap-3">
                          <div className="flex items-center">
                            <span
                              style={{
                                color: "#10274F",
                                marginRight: ".5rem",
                              }}
                            >
                              Ratings:
                            </span>{" "}
                            <span>
                              {profileData.pro_profile?.rating ? (
                                profileData.pro_profile.rating
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#F3E5AB"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                  />
                                </svg>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" flex items-start flex-col w-[50%]">
                      <div className="bg-blue-50 h-full w-full flex items-center py-6 flex-col rounded-2xl">
                        <div>
                          <h5 className="text-neutral-800 pb-3 font-semibold">
                            Preferred Working Hours
                          </h5>
                        </div>
                        {profileData?.pro_profile?.working_hours.length > 0 ? (
                          <div className="w-full">
                            {profileData?.pro_profile?.working_hours.map(
                              (item) => (
                                <div className="flex px-4 border-b  w-full">
                                  <div
                                    className="responsive-days w-full xl:w-[12rem]"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div className="p-2 w-full">
                                      {item.name}
                                    </div>
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
                              )
                            )}
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
                  </div>
                  <div className="flex gap-3 pt-8">
                    <Link
                      to={`/profile-details?${profileData?.uuid}`}
                      className="py-3 text-center border rounded-lg hover:bg-[#0f75bc]/5 border-[#0f75bc] w-full text-[#0f75bc]"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/chats?${profileData?.uuid}`}
                      className="hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3 w-full items-center text-center bg-[#0f75bc] text-white rounded-md "
                    >
                      Contact this Pro
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* here is pagination  */}

      <div className=" w-full flex justify-end">
        {data?.length > 0 && (
        <Pagination
            currentPage={currentPage}
            pageCount={Math.ceil(data.length / 9)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>

    // Invoke when user click to request another page.
  );
}
