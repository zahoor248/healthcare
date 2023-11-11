import React, { useEffect, useState } from "react";
import emptyState from "../../assets/images/reservation.png";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
import { Link, useLocation } from "react-router-dom";
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
    <div className="flex main-container  h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">My Reservations</div>
        </div>
        {reservations?.length > 0 ? (
          <div className="flex justify-between shadow-class border-neutral-300  border w-full rounded-xl my-10 gap-9 flex-wrap">
            {reservations?.map((item, index) => (
              <div className=" h-fit w-full  hover:shadow-sm  ">
                {" "}
                <div className="flex flex-col md:flex-row justify-start w-full ">
                  <div className="flex items-start gap-4 border-b md:border-r md:w-[35%] p-5 lg:p-8">
                    <div className="">
                      <p className="font-bold text-[#2676BC] text-xl"> Offer</p>
                      <div className="flex flex-row gap-3 pt-4">
                        <div className="font-semibold">Location:</div>
                        <p className="whitespace-pre-wrap">{item?.location}</p>
                      </div>
                      <div className="flex flex-row gap-3 pt-4">
                        <div className="font-semibold">Date:</div>
                        <div className="flex">
                          <p className="">
                            {dayjs(item?.start_date).format("DD/MM/YYYY")}
                          </p>
                          <span className="px-2">-</span>
                          <p className="">
                            {dayjs(item?.end_date).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-col p-5 lg:p-8 border-b md:border-r md:w-[27%]">
                    <div className="font-semibold">
                      {item?.pay_rate}$ / {item?.pay_duration} offer to :
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        {item.offered_to?.photo_url != null ? (
                          <img src={item.offered_to?.photo_url} />
                        ) : (
                          <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                            {item?.offered_to?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl capitalize">
                          {item?.offered_to?.firstname}{" "}
                          {item?.offered_to?.lastname}
                        </p>
                        <p className="">
                          {item?.offered_to?.about_me || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-col !pb-4 !pr-4 p-5 lg:p-8 md:w-[40%]">
                    <div className="font-semibold">
                      Offere by:
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        {item.offered_by?.photo_url != null ? (
                          <img src={item.offered_by?.photo_url} />
                        ) : (
                          <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                            {item?.offered_by?.firstname.charAt(0)}
                          </div>
                        )}
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl capitalize">
                          {item?.offered_by?.firstname}{" "}
                          {item?.offered_by?.lastname}
                        </p>
                        <p className="">{item?.offered_by?.about_me}</p>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 justify-end w-full">
                      <Link className="w-full md:w-auto items-end" to={`/reservation-detail?${item?.uuid}`}>
                        <button className="px-6 w-full md:w-auto py-3 bg-blue-600 text-white rounded-lg mt-2">
                          Details
                        </button>
                      </Link>
                    </div>
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
