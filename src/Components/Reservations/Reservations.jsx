import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/reservation.png";
import User from "../../assets/images/holderpic.jpeg";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
import { Link, useLocation } from "react-router-dom";
import CommonPrimaryButton from "../CommonPrimaryButton";
const Reservations = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    console.log(user.uuid);
    handleAPIRequest("get", `reservation`, null, {
      account_uuid: user.accounts[0].uuid,
    })
      .then((response) => {
        if (response.data) {
          dispatch(
            setAllReasevation(
              response.data.filter((item) => item.status != "closed")
            )
          ); // Update Redux store with an empty array
        } else {
          console.log(response, "Here is the response");
          dispatch(setAllReasevation(response));
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [location]);
  return (
    <div className="flex main-container overflow-auto w-full">
      <div className="flex w-full flex-col    py-[52px]">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-[32px] font-semibold">Offers</div>
        </div>
        {reservations?.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-10 gap-8">
            {reservations?.map((item, index) => (
              <div className=" h-full w-full  shadow-class rounded-lg overflow-hidden p-6 ">
                {" "}
                <div className="flex flex-col w-full justify-start ">
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex items-center text-neutral-700 bg-[#EFF4F8] rounded-sm px-4 flex-row gap-3 py-4 w-full">
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
                        <span className=" text-neutral-500 font-normal text-sm">
                          Date
                        </span>
                        <div className="flex">
                          <p className="font-normal text-base text-[#10274F]">
                            {dayjs(item.start_date, {
                              format: "DD/MM/YYYY",
                            }).format("MMM. DD, YYYY")}
                          </p>
                          <span className="font-normal text-base text-[#10274F] px-1.5">
                            -
                          </span>
                          <p className="font-normal text-base text-[#10274F]">
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
                          <circle cx="12" cy="10" r="2" fill="#ffffff" />
                        </svg>

                        <span className="font-normal text-sm text-[#828487]">
                          Location:
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap pl-1 font-normal text-base text-[#0060FF] capitalize">
                        {item?.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start w-full gap-4 flex-col pt-5">
                    <div className=" capitalize font-semibold text-xl text-[#10274F]">
                      ${item?.pay_rate} {item?.pay_duration} offer to:
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        to={
                          item.offered_to?.uuid != user.uuid &&
                          (item.offered_to.type === "pro" && user.type === "bus"
                            ? `/profile-details?${item.offered_to?.uuid}`
                            : `/bussiness-profile-details?${item.offered_to?.uuid}`)
                        }
                        className=" !rounded-full border overflow-hidden w-10 h-10"
                      >
                        {item.offered_to?.photo_url != null ? (
                          <img src={item.offered_to?.photo_url} />
                        ) : (
                          <img src={User} />
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </Link>
                      <div className=" flex flex-col items-start">
                        <p className="font-medium text-base text-[#696F7A] capitalize">
                          {item?.offered_to?.firstname}{" "}
                          {item?.offered_to?.lastname}
                        </p>
                        {item?.offered_to?.about_me && (
                          <p className="text-sm font-medium text-[#828487] pt-2">
                            {item?.offered_to?.about_me}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t items-end pt-5 mt-5 w-full">
                    <div className="w-full">
                      <div className=" capitalize font-semibold text-lg text-[#10274F]">
                        Offere by:
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="flex items-center w-fit gap-2 justify-between pt-3 ">
                        <Link
                          to={
                            item.offered_by?.uuid != user.uuid &&
                            (item.offered_by?.type === "pro" &&
                            user.type === "bus"
                              ? `/bussiness-profile-details?${item.offered_by?.uuid}`
                              : `/bussiness-profile-details?${item.offered_by?.uuid}`)
                          }
                          className=" !rounded-full border overflow-hidden w-10 h-10"
                        >
                          {item.offered_by?.photo_url != null ? (
                            <img src={item.offered_by?.photo_url} />
                          ) : (
                            <img src={User} />
                          )}
                          {/* <GoPrimitiveDot className='online-icon'/> */}
                        </Link>
                        <p className="font-medium text-base text-[#696F7A] capitalize">
                          {item?.offered_by?.firstname}{" "}
                          {item?.offered_by?.lastname}
                        </p>
                      </div>
                    </div>

                    <Link
                      className="w-full flex justify-end"
                      to={`/reservation-detail?${item?.uuid}`}
                    >
                      <CommonPrimaryButton loading={false} text={"Details"} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
            <img src={emptyState} className="w-32" />
            <div className="text-xl md:text-3xl ">
              Your reservations will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
