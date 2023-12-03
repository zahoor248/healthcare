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
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)] justify-center  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Active Conrtracts</div>
        </div>

        {contracts?.length > 0 ? (
          <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
            {contracts?.map((item, index) => (
              <div className="border-neutral-400 shadow-class border h-fit w-full    rounded-xl">
                {" "}
                <div className="flex justify-start flex-col md:flex-row w-full ">
                  <div className="flex flex-col items-start border-b md:border-b-0 md:border-r w-full p-5 lg::p-8">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-[#2676BC] text-xl">
                        {" "}
                        Contract #: {item.id}
                      </p>
                      <div className="  px-6 bg-blue-50 !text-blue-600 border-blue-600 capitalize border rounded-full py-[2px] text-sm">
                        {item.business.status}
                      </div>
                    </div>
                    <div className="  flex flex-col ">
                      <div className="py-2 pt-8 text-xl font-bold">
                        Contract Details:
                      </div>
                      <div className="flex text-neutral-700 flex-row gap-3 pt-2">
                        <div className="font-semibold">Location:</div>
                        <p className="">{item.location}</p>
                      </div>
                      <div className="flex text-neutral-700 flex-row gap-3 pt-4">
                        <div className="font-semibold">Date:</div>
                        <div className="flex">
                          <p className="">
                            {dayjs(item.start_date).format("DD/MM/YYYY")}
                          </p>
                          <span className="px-2">-</span>
                          <p className="">
                            {dayjs(item.end_date).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 text-neutral-700 flex gap-2">
                        {" "}
                        <div className="font-semibold">Description:</div>
                        {item.description}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                      {" "}
                      <div className="text-xl font-bold">Contract Details:</div>
                      {item.additional_terms}
                    </div>
                  </div>
                  <div className="flex items-start gap-4 w-full flex-col p-5 lg:p-8 ">
                    <div className="font-bold text-[#2676BC] text-xl">
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                      Contract Between:
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        {item.business?.photo_url != null ? (
                          <img src={item.business?.photo_url} />
                        ) : (
                          <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                            {item?.business?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl capitalize">
                          {item?.business?.firstname} {item?.business?.lastname}
                        </p>
                        <p className="">{item?.business?.about_me}</p>
                      </div>
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        {item.pro?.photo_url != null ? (
                          <img src={item.pro?.photo_url} />
                        ) : (
                          <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                            {item?.pro?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl capitalize">
                          {item?.pro?.firstname} {item?.pro?.lastname}
                        </p>
                        <p className="">
                          {item?.pro?.about_me ? item?.pro?.about_me : "N/A"}
                        </p>
                      </div>
                    </div>
                    {user.type == "pro" && item.pro_acceptance != null && (
                      <div className="flex w-full justify-end">
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
                      <div className="flex w-full justify-end">
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
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"></div>
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
