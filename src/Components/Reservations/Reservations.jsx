import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
const Reservations = () => {
  const [loading, setLoading] = useState(false);
  const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reservations) {
      setLoading(true);

      handleAPIRequest("get", "reservation", null)
        .then((response) => {
          if (response.data) {
            dispatch(setAllReasevation([])); // Update Redux store with an empty array
          } else {
            console.log(response, "Here is the response");
            dispatch(setAllReasevation(response));
          }

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [reservations]);
  return (
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">My Reservations</div>
        </div>
        {reservations?.length > 0 ? (
          <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
            {reservations?.map((item, index) => (
              <div className="border-neutral-900 border h-fit w-full  hover:shadow-sm  rounded-xl">
                {" "}
                <div className="flex justify-startw-full ">
                  <div className="flex items-start gap-4 border-r w-[35%] p-8">
                    <div className="">
                      <p className="font-bold text-[#2676BC] text-xl"> Offer</p>
                      <div className="flex flex-row gap-3 pt-4">
                        <div className="font-semibold">Location:</div>
                        <p className="">{item.location}</p>
                      </div>
                      <div className="flex flex-row gap-3 pt-4">
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
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-col p-8 border-r w-[27%]">
                    <div className="font-semibold">
                      100$ / fixed offer to :
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        <img src={item.user_avatar} />
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl">
                          {item.contractor_name}
                        </p>
                        <p className="">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-col !pb-4 !pr-4 p-8 w-[40%]">
                    <div className="font-semibold">
                      Offere by:
                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="flex items-center pt-3 gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        <img src={item.user_avatar} />
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl">
                          {item.contractor_name}
                        </p>
                        <p className="">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex w-full justify-end">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center center pt-20">
            <div className="text-3xl ">Your reservations will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
