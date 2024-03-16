import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/icon-contract-19.jpg";
import User from "../../assets/images/holderpic.jpeg";

import dayjs from "dayjs";
import { setContracts } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { Link, useLocation } from "react-router-dom";
import StarRating from "./RatingStarts";
import CommonPrimaryButton from "../CommonPrimaryButton";

import { FaStar } from "react-icons/fa";
import Toast from "../AppLoader";

const Rating = ({ rating, onRatingPress }) => {
  const stars = [];
  const maxRating = 5; // Change this to set the maximum rating

  for (let i = 1; i <= maxRating; i++) {
    const iconColor = i <= rating ? "gold" : "#9E9E9E";
    // Use 'gold' for selected stars and 'gray' for unselected stars

    // Use 'star' for filled and 'star-o' for empty stars
    stars.push(
      <div key={i} onClick={() => onRatingPress(i)}>
        <FaStar color={iconColor} />
      </div>
    );
  }

  return (
    <div
      className="text-2xl gap-2.5"
      style={{ display: "flex", flexDirection: "row", marginVertical: 5 }}
    >
      {stars}
    </div>
  );
};

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const contracts = useSelector((state) => state.contracts);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [button_loading, setButtonLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [review, setReview] = useState({
    toggle: false,
    contract_id: "",
    user_id: "",
    item: "",
  });
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    handleAPIRequest("get", "contract", null)
      .then((response) => {
        if (response.data) {
          dispatch(setContracts(response.data.contracts)); // Update Redux store with empty array
        } else {
          dispatch(setContracts(response));
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [location]);

  const handleApprove = (item) => {
    setLoading(true);
    handleAPIRequest("POST", `approve-contract/${item.uuid}`, null)
      .then((res) => {
        handleAPIRequest("get", "contract", null)
          .then((response) => {
            if (response.data) {
              dispatch(setContracts(response.data.contracts)); // Update Redux store with empty array

              setShowToast({
                ...showToast,
                toggle: true,
                status: "info",
                message: "Contract has been approved",
                lable: "Contract Approved",
              });

              setTimeout(() => {
                setShowToast({
                  ...showToast,
                  toggle: false,
                  status: "info",
                  message: "Contract has been approved",
                  lable: "Contract Approved",
                });
              }, 2000);
            } else {
              dispatch(setContracts(response));
            }

            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
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
          });
      })
      .catch((error) => {});
  };

  const handleSubmit = (contract_id, user_id, rating, reviewText) => {
    // You can implement your submission logic here

    console.log(contract_id, user_id, rating, reviewText);
    // setLoading(true);
    handleAPIRequest("POST", "review", {
      contract_id: contract_id,
      user_id: user_id,
      rating: rating,
      feedback: reviewText,
    })
      .then((response) => {
        console.log(response, "TEstigngngngn");
        setLoading(false);
        // navigation.goBack();

        setShowToast({
          ...showToast,
          toggle: true,
          status: "info",
          message: "Thanks for your feedback",
          lable: "Review Added",
        });

        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "info",
            message: "Thanks for your feedback",
            lable: "Review Added",
          });
        }, 2000);

        handleAPIRequest("get", "contract", null)
          .then((response) => {
            if (response.data) {
              dispatch(setContracts(response.data.contracts)); // Update Redux store with empty array
            } else {
              dispatch(setContracts(response));
            }

            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });

        setRating(0);
        setReviewText("");
        // navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        // showMessage({
        //   message: `Alert`,
        //   description: 'Something went wrong',
        //   type: 'danger',
        // });
      });
  };

  const handleRatingPress = (newRating) => {
    setRating(newRating); // Update the rating when a star is pressed
  };
  return (
    <div className="flex main-container  overflow-auto w-full">
      <div className="flex w-full flex-col py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl font-semibold">My Contracts</div>
        </div>

        {contracts?.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-10 gap-8">
            {contracts?.map((item, index) => (
              <div className=" h-full w-full  shadow-class rounded-lg overflow-hidden">
                {" "}
                <div className="flex justify-start flex-col w-full h-full ">
                  <div className="flex flex-col items-start border-b md:border-b-0 md:border-r w-full p-5 lg::p-8">
                    <div className="flex items-center gap-3 w-full">
                      {/* Date here  */}
                      <div className="flex items-center text-neutral-700 bg-blue-50 px-4 rounded flex-row gap-3 py-4 w-full">
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
                          <span className=" text-neutral-600 pb-1">Date</span>
                          <div className="flex">
                            <p className="font-semibold">
                              {dayjs(item.start_date, {
                                format: "DD/MM/YYYY",
                              }).format("MMM. DD, YYYY")}
                            </p>
                            <span className="px-2">-</span>
                            <p className="font-semibold">
                              {dayjs(item.end_date, {
                                format: "DD/MM/YYYY",
                              }).format("MMM. DD, YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded bg-neutral-50 p-4 mb-4 mx-4">
                    <div className="  pb-2 text-neutral-600 capitalize">
                      Pay Duration:{" "}
                      <span className="text-blue-600">
                        $ {item.pay_rate} / {item.pay_duration}
                      </span>
                    </div>

                    <div className="  text-neutral-600 capitalize">
                      Location:{" "}
                      <span className="text-blue-600">{item.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 w-full flex-col px-5 pb-8 lg:px-8 h-full">
                    <div className="font-bold text-neutral-800 text-xl">
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                      Between:
                    </div>
                    <div className="flex items-center  gap-4">
                      <Link
                        to={
                          item.business?.uuid != user.uuid &&
                          `/bussiness-profile-details?${item.business?.uuid}`
                        }
                        className=" !rounded-full overflow-hidden w-10 h-10"
                      >
                        {item.business?.photo_url != null ? (
                          <img src={item.business?.photo_url} 
                          className="w-full h-full object-cover"

                          />
                        ) : (
                          <img src={User} 
                          
                          className="w-full h-full object-cover"

                          />
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </Link>
                      <div className="">
                        <p className="font-semibold text-md text-neutral-600 capitalize">
                          {item?.business?.firstname} {item?.business?.lastname}
                        </p>
                        <p className="">{item?.business?.about_me}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <Link
                        to={
                          item.pro?.uuid != user.uuid &&
                          `/profile-details?${item.pro?.uuid}`
                        }
                        className=" !rounded-full overflow-hidden w-10 h-10"
                      >
                        {item.pro?.photo_url != null ? (
                          <img 
                          className="w-full h-full object-cover"
 
                          
                          src={item.pro?.photo_url} />
                        ) : (
                          <img src={User} />
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </Link>
                      <div className="">
                        <p className="font-semibold text-md text-neutral-600 capitalize">
                          {item?.pro?.firstname} {item?.pro?.lastname}
                        </p>
                        <p className="">
                          {item?.pro?.about_me ? item?.pro?.about_me : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between pt-2  border-t-2 items-center">
                      <div className=" flex items-center ">
                        <span className="font-bold text-md   text-blue-600 ">
                          Status:{" "}
                        </span>
                        <span className="underline px-1 f-f-g-m capitalize text-green-500">
                          {item.status}
                        </span>
                      </div>

                      {user.type == "pro" ? (
                        <>
                          {/* {user.type == "pro" && !item.pro_acceptance && (
                            <div className="flex w-full justify-end pt-2">
                              <div
                                className="w-full md:w-auto"
                                onClick={() => handleApprove(item)}
                              >
                                <CommonPrimaryButton
                                  loading={false}
                                  text={"Close"}
                                />
                              </div>
                            </div>
                          )} */}

                          {user.type === "pro" &&
                          item.status === "closed" &&
                          !item.reviews.some(
                            (review) => review.reviewer_id === user.id
                          ) ? (
                            <div className="flex w-full justify-end pt-2">
                              <div
                                className="w-full md:w-auto"
                                onClick={() => {
                                  if (rating > 0 && feedback.length) {
                                    handleSubmit(
                                      item.id,
                                      user.type === "pro"
                                        ? item.bus_id
                                        : item.pro_id,
                                      rating,
                                      feedback
                                    );
                                  } else {
                                    //show Toast for select rating
                                  }
                                }}
                              >
                                <CommonPrimaryButton
                                  loading={false}
                                  text={"Leave Review"}
                                />
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}

                      {user.type == "bus" ? (
                        <>
                          {user.type == "bus" && item.status === "open" && (
                            <div className="flex w-full justify-end pt-2">
                              <div
                                className="w-full md:w-auto"
                                onClick={() => handleApprove(item)}
                              >
                                <CommonPrimaryButton
                                  loading={false}
                                  text={"Close"}
                                />
                              </div>
                            </div>
                          )}

                          {item.reviews &&
                          item.status === "closed" &&
                          !item.reviews.some(
                            (review) => review.reviewer_id === user.id
                          ) ? (
                            <div className="flex w-full justify-end pt-2">
                              <div
                                className="w-full md:w-auto"
                                onClick={() => {
                                  if (rating > 0 && feedback.length) {
                                    handleSubmit(
                                      item.id,
                                      user.type === "pro"
                                        ? item.bus_id
                                        : item.pro_id,
                                      rating,
                                      feedback
                                    );
                                  } else {
                                    //show Toast for select rating
                                  }
                                }}
                              >
                                <CommonPrimaryButton
                                  loading={false}
                                  text={"Leave Review"}
                                />
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </div>

                    <div className="text-neutral-600">
                      Notes: {item.description}
                    </div>

                    {user.type === "bus" &&
                    item.status === "closed" &&
                    !item.reviews.some(
                      (review) => review.reviewer_id === user.id
                    ) ? (
                      <div className="bg-slate-50 w-full rounded  py-2 px-3">
                        <div className="font-semibold text-lg flex items-center gap-3">
                          Feedback:{" "}
                          <Rating
                            // maxScale={5}
                            // style={{marginVertical: 20}}
                            rating={rating}
                            onRatingPress={handleRatingPress}
                          />
                        </div>
                        <textarea
                          placeholder="Write a feedback..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="text-lg placeholder-[#B8C0CB] bg-[#EFEFF8] mt-3 text-neutral-800 py-3 px-4 border border-transparent rounded-md w-full"
                        ></textarea>
                        {/* <p className="f-f-g-m text-neutral-600 pb-2 capitalize">
                        {item.reviews[0]?.feedback}
                      </p> */}
                      </div>
                    ) : null}

                    {user.type === "pro" &&
                    item.status === "closed" &&
                    !item.reviews.some(
                      (review) => review.reviewer_id === user.id
                    ) ? (
                      <div className="bg-slate-50 w-full rounded py-2 px-3 ">
                        <div className="font-semibold text-lg flex items-center gap-3">
                          Feedback:{" "}
                          <Rating
                            // maxScale={5}
                            // style={{marginVertical: 20}}
                            rating={rating}
                            onRatingPress={handleRatingPress}
                          />
                        </div>
                        <textarea
                          placeholder="Write a feedback..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="text-lg placeholder-[#B8C0CB] bg-[#EFEFF8] mt-3 text-neutral-800 py-3 px-4 border border-transparent rounded-md w-full"
                        ></textarea>
                        {/* <p className="f-f-g-m text-neutral-600 pb-2 capitalize">
                        {item.reviews[0]?.feedback}
                      </p> */}
                      </div>
                    ) : null}

                    {item.reviews.some(
                      (review) => review.reviewer_id === user.id
                    ) && (
                      <div className="bg-slate-50 w-full rounded px-3 p-2 h-full">
                        <div className="font-semibold text-lg flex items-center gap-3">
                          Feedback:{" "}
                          <Rating
                            // maxScale={5}
                            // style={{marginVertical: 20}}
                            rating={
                              item.reviews && item.reviews.length > 0
                                ? item.reviews.filter(
                                    (review) => review.reviewer_id !== user.id
                                  )[0]?.rating || 0
                                : 0
                            }
                            onRatingPress={handleRatingPress}
                          />
                        </div>
                        <p className="f-f-g-m text-neutral-600 pb-2 capitalize h-full">
                          {item.reviews && item.reviews.length > 0
                            ? item.reviews.filter(
                                (review) => review.reviewer_id !== user.id
                              )[0]?.feedback || ""
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
            <img src={emptyState} className="w-32" />
            <div className="text-3xl ">Your contracts will appear here</div>
          </div>
        )}
      </div>
      {/* review model here  */}
      {review.toggle && (
        <div
          onClick={() =>
            setReview({
              ...review,
              toggle: !review.toggle,
            })
          }
          className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"
        ></div>
      )}
      {/* {review.toggle && (
        <div className="h-screen inset-0 flex justify-center items-center w-full fixed z-50  m-auto">
          <div className="w-full max-w-[600px] flex flex-col fixed justify-start items-start p-8 z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
            <div className="text-xl pb-4">{"Add Review here"}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="text-base text-neutral-600">
                  Rate your experience
                </div>
                <StarRating onChange={(newRating) => setRating(newRating)} />
                <p className="text-base mt-2 text-neutral-600">
                  Share your experience
                </p>
                <textarea
                  className="text-md placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write Something"
                  variant="outlined"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full justify-end mt-8">
              <CommonPrimaryButton
                onClick={() => handleReviewSubmit()}
                loading={button_loading}
                text={"Submit"}
              />
            </div>
          </div>
        </div>
      )} */}

      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
};

export default Contacts;
