import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/icon-contract-19.jpg";

import dayjs from "dayjs";
import { setContracts } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { Link, useLocation } from "react-router-dom";
import StarRating from "./RatingStarts";
import CommonPrimaryButton from "../CommonPrimaryButton";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const contracts = useSelector((state) => state.contracts);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [button_loading, setButtonLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    toggle: false,
    contract_id: "",
    user_id: "",
    item: "",
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
    if (user.type == "pro") {
      if (
        item.reviews &&
        item.pro_acceptance &&
        !item.reviews.some((review) => review.reviewer_id === user.id)
      ) {
        setReview({
          ...review,
          toggle: true,
          contract_id: item.id,
          user_id: user.type === "bus" ? item.bus_id : item.pro_id,
          item: item,
        });
      }
    } else if (user.type == "bus") {
      if (
        // item.bus_acceptance &&
        // !item.reviews.some((review) => review.reviewer_id === user.id)
        true
      ) {
        setReview({
          ...review,
          toggle: true,
          contract_id: item.id,
          user_id: user.type === "pro" ? item.bus_id : item.pro_id,
          item: item,
        });
      }
    }
    console.log(item);
  };

  const handleReviewSubmit = () => {
    setButtonLoading(true);
    // Implement your logic to submit the review and rating
    console.log("Submitting Review:", reviewText);
    console.log("Rating:", rating);

    handleAPIRequest("POST", "review", {
      contract_id: review.contract_id,
      user_id: review.user_id,
      rating: rating,
      feedback: reviewText,
    })
      .then((response) => {
        setButtonLoading(false);

        handleAPIRequest("POST", `approve-contract/${review.item.uuid}`, null)
          .then((response) => {})
          .catch((error) => {});
        setReview({
          ...review,
          toggle: false,
        });
      })
      .catch((error) => {
        setButtonLoading(false);
        setReview({
          ...review,
          toggle: false,
        });
      });
    // Reset state or close the review form if needed
  };
  return (
    <div className="flex main-container  overflow-auto w-full">
      <div className="flex w-full flex-col py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">My Conrtracts</div>
        </div>

        {contracts?.length > 0 ? (
          <div className=" justify-between w-full py-10 gap-9 flex-wrap">
            {contracts?.map((item, index) => (
              <div className="shadow-class  h-fit w-full max-w-[400px]   rounded-xl">
                {" "}
                <div className="flex justify-start flex-col w-full ">
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
                  <div className="flex items-start gap-4 w-full flex-col px-5 pb-8 lg:px-8 ">
                    <div className="font-bold text-neutral-800 text-xl">
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                      Between:
                    </div>
                    <div className="flex items-center  gap-4">
                      <div className=" !rounded-full overflow-hidden w-10 h-10">
                        {item.business?.photo_url != null ? (
                          <img src={item.business?.photo_url} />
                        ) : (
                          <div className="w-10 h-10 flex justify-center capitalize items-center bg-[#39B7A5] text-white">
                            {item?.business?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-semibold text-md text-neutral-600 capitalize">
                          {item?.business?.firstname} {item?.business?.lastname}
                        </p>
                        <p className="">{item?.business?.about_me}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-10 h-10">
                        {item.pro?.photo_url != null ? (
                          <img src={item.pro?.photo_url} />
                        ) : (
                          <div className="w-10 h-10 flex justify-center capitalize items-center bg-blue-500 text-white">
                            {item?.pro?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-semibold text-md text-neutral-600 capitalize">
                          {item?.pro?.firstname} {item?.pro?.lastname}
                        </p>
                        <p className="">
                          {item?.pro?.about_me ? item?.pro?.about_me : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between pt-2  border-t-2 items-center">
                      <div className=" flex items-center ">
                        <span className="font-bold text-md   text-blue-600 ">
                          Status:{" "}
                        </span>
                        <span className="underline px-1 f-f-g-m capitalize text-green-500">
                          {item.business.status}
                        </span>
                      </div>

                      {user.type == "pro" && item.pro_acceptance != null && (
                        <div className="flex w-full justify-end pt-2">
                          <div
                            className="w-full md:w-auto"
                            onClick={() => handleApprove(item)}
                          >
                            <CommonPrimaryButton
                              loading={false}
                              text={"Close Contract"}
                            />
                          </div>
                        </div>
                      )}
                      {user.type == "bus" && item.bus_acceptance != null && (
                        <div className="flex w-full justify-end pt-2">
                          <div
                            className="w-full md:w-auto"
                            onClick={() => handleApprove(item)}
                          >
                            <CommonPrimaryButton
                              loading={false}
                              text={"Close Contract"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-50 w-full rounded px-4 ">
                      <div className="font-bold text-md flex items-center gap-3">
                        Feedback:{" "}
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            role="button"
                            tabIndex={0}
                            style={{
                              cursor: "pointer",
                              fontSize: "30px",
                              color:
                                index + 1 <= item.reviews[0]?.rating
                                  ? "#ffd700"
                                  : "#c2c2c2",
                            }}
                          >
                            &#9733; {/* Unicode character for a solid star */}
                          </span>
                        ))}
                      </div>

                      <p className="f-f-g-m text-neutral-600 pb-2 capitalize">
                        {item.reviews[0]?.feedback}
                      </p>
                    </div>{" "}
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
      {review.toggle && (
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
      )}
    </div>
  );
};

export default Contacts;
