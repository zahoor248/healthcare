import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
import { Link, useLocation } from "react-router-dom";
const Reservations = () => {
  const [loading, setLoading] = useState(false);
  const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!reservations) {
      setLoading(true);
      console.log(user.uuid);
      handleAPIRequest(
        "get",
        `reservation`,
        null
      )
        .then((response) => {
          if (response.data) {
            const res = {
              data: [
                {
                  id: 2,
                  uuid: "b9f68051-e839-43ba-a0ad-a530b79442ee",
                  account_id: 17,
                  parent_id: 0,
                  offered_by: {
                    id: 42,
                    is_admin: 0,
                    type: "bus",
                    uuid: "02228226-ef3b-4bc5-a7dc-5862d68f076b",
                    firstname: "faraz",
                    lastname: "syed",
                    email: "syed@yopmail.com",
                    email_verified_at: null,
                    created_at: "2023-08-28T15:35:22.000000Z",
                    updated_at: "2023-11-01T08:27:34.000000Z",
                    status: "pending",
                    about_me: null,
                    verified: "no",
                    photo_url: null,
                    fcm_token:
                      "d-6R9-pSTRSI8PiepUfi-C:APA91bEG1KdNOGjoUlSY3q_ACL1hnpqD4WrkOnj_KfLnUmIWpiTBTnmPtCx18rjLBpjoMjmrhvT3MQv4VxngTFe49pQAfia4OXen3r3y3SdsBUsWIK1b58qKwRCWpEn1l4qaKm7un4tg",
                    code: null,
                  },
                  offered_to: {
                    id: 25,
                    is_admin: 0,
                    type: "pro",
                    uuid: "f7371985-ef4a-48f6-84b4-897442ae0325",
                    firstname: "hello",
                    lastname: "world",
                    email: "helloworld@yopmail.com",
                    email_verified_at: null,
                    created_at: "2023-07-27T09:47:49.000000Z",
                    updated_at: "2023-10-31T17:31:08.000000Z",
                    status: "active",
                    about_me: null,
                    verified: "no",
                    photo_url: null,
                    fcm_token:
                      "ebn8EGfVg08Btv208a-Kuh:APA91bGHbJISiEsVlo4q-LOZF29aZMEz7VsYh9khnt97Fy5FRHnXB2OMPKW9KbDT8w58CDenPx9KTfoteqV_7nKFlOlJj_ECJfeAUziXX84EOf5U8_O-PK3pVcROfiq1IzqmzP630vxl",
                    code: null,
                  },
                  start_date: "2023-10-31",
                  end_date: "2023-10-31",
                  pay_rate: 11,
                  pay_duration: "hourly",
                  location: "USA Parkway Sparks NV USA",
                  description: "Fff",
                  created_at: "2023-10-31T17:28:16.000000Z",
                  updated_at: "2023-10-31T17:44:45.000000Z",
                  status: "countered",
                  offered_by_me: false,
                  made_by_owner: false,
                  counter_offer_counts: 1,
                  account: {
                    id: 17,
                    uuid: "59fd5141-0c50-441b-aa27-ec44c2cf6171",
                    type: "bus",
                    owner_id: 41,
                    name: "test's Account",
                    updated_at: "2023-08-28T15:22:19.000000Z",
                    created_at: "2023-08-28T15:22:19.000000Z",
                    status: "active",
                  },
                },
              ],
            };
            dispatch(setAllReasevation(res.data)); // Update Redux store with an empty array
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
                        <p className="">{item?.offered_to?.about_me}</p>
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
                    <div className="flex w-full justify-end">
                      <Link to={`/reservation-detail?${item?.uuid}`}>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
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
          <div className="flex w-full justify-center center pt-20">
            <div className="text-3xl ">Your reservations will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
