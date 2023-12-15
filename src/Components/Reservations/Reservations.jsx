import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/reservation.png";
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
          dispatch(setAllReasevation(response.data)); // Update Redux store with an empty array
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
    <div className="flex main-container   h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">My Offers</div>
        </div>
        {reservations?.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-10 gap-8">
            {reservations?.map((item, index) => (
              <div className=" h-full w-full  shadow-class rounded-lg overflow-hidden p-6 ">
                {" "}
                <div className="flex flex-col w-full justify-start ">
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="flex items-center text-neutral-700 bg-blue-50 rounded-sm px-4 flex-row gap-3 py-4 w-full">
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
                        <span className=" text-neutral-500 font-normal">
                          Date
                        </span>
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
                    <div className="flex justify-start w-full flex-col gap-1 pt-4">
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

                        <span className="font-medium text-neutral-500">
                          Location:
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap pl-1 font-semibold text-blue-700 capitalize">
                        {item?.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start w-full gap-4 flex-col pt-8 ">
                    <div className=" capitalize font-bold text-lg text-neutral-600">
                      ${item?.pay_rate} {item?.pay_duration} offer to:
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className=" !rounded-full overflow-hidden w-10 h-10">
                        {item.offered_to?.photo_url != null ? (
                          <img src={item.offered_to?.photo_url} />
                        ) : (
                          <div className="w-10 h-10 flex justify-center capitalize items-center bg-green-500 text-white">
                            {item?.offered_to?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
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

                  <div className="flex justify-between border-t items-end pt-3 mt-5 w-full">
                  <div className="w-full">
                    <div className="font-semibold">
                      Offere by:
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center w-fit gap-2 justify-between pt-3 ">
                     
                        <div className=" !rounded-full overflow-hidden w-10 h-10">
                          {item.offered_by?.photo_url != null ? (
                            <img src={item.offered_by?.photo_url} />
                          ) : (
                            <div className="w-10 h-10 flex justify-center capitalize items-center bg-blue-500 text-white">
                              {item?.offered_by?.firstname.charAt(0)}
                            </div>
                          )}
                          {/* <GoPrimitiveDot className='online-icon'/> */}
                        </div>
                          <p className="font-semibold text-base text-neutral-600 capitalize">
                            {item?.offered_by?.firstname}{" "}
                            {item?.offered_by?.lastname}
                          </p>
                      
                      </div>
                    </div>
             
                        <Link
                          className="w-full flex justify-end"
                          to={`/reservation-detail?${item?.uuid}`}
                        >
                          <CommonPrimaryButton
                            loading={false}
                            text={"Details"}
                          />
                        </Link>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
            <img src={emptyState} className="w-32" />
            <div className="text-3xl ">Your reservations will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
