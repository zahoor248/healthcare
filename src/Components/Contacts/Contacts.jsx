import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import dayjs from "dayjs";
import { setContracts } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { Link, useLocation } from "react-router-dom";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const contracts = useSelector((state) => state.contracts);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    handleAPIRequest("get", "contract", null)
      .then((response) => {
        if (response.data) {
          dispatch(setContracts(response.data.contracts)); // Update Redux store with empty array
        } else {
          console.log(response, "Here is the response");
          dispatch(setContracts(response));
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [location]);
  return (
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Active Conrtracts</div>
        </div>

        <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
          {contracts?.map((item, index) => (
            <div className="border-neutral-900 border h-fit w-full  hover:shadow-sm  rounded-xl">
              {" "}
              <div className="flex justify-startw-full ">
                <div className="flex items-start gap-4 border-r w-full p-8">
                  <div className="">
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
                </div>
                <div className="flex items-start gap-4 w-full flex-col p-8 ">
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
                  <div className="flex w-full justify-end">
                    <Link to={`/reservation-detail?${item?.uuid}`}>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
                        Cancel Contract
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
