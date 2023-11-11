import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setAllReasevation } from "../../Store/Actions/Actions";
import { Link, useLocation } from "react-router-dom";
const ReservationDetails = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [reservationDetails, setReservationDetails] = useState([]);
  const [opentoAcceptoffer, setOpenToAcceptOffer] = useState([]);
  const [terms, setTerms] = useState({
    toggle: false,
    termsText: "",
  });
  const reservations = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    console.log(user.uuid);
    handleAPIRequest(
      "get",
      `reservation/${location.search.split("?")[1]}`,
      null
    )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setReservationDetails(response.data.reservation);
          let parentReservation = [response.data.reservation];

          let counterOffers = response.data.reservation.counterOffers;

          if (counterOffers.length) {
            counterOffers.map((item) => {
              parentReservation.push(item);
            });
          }

          let opentoAcceptoffer = parentReservation.filter(
            (item) => item.status === "open"
          );

          setOpenToAcceptOffer(opentoAcceptoffer[0]);
        } else {
          setReservationDetails(response);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [location, user]);

  const handleReviewSubmit = () => {
    handleAPIRequest("POST", `accept-offer/${location.search.split("?")[1]}`, {
      additional_terms: terms.termsText,
    })
      .then((response) => {
        setTerms({ ...terms, toggle: false });
      })
      .catch((error) => {});
  };
  return (
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Offer Details</div>
        </div>

        <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
          <div className="border-neutral-900 border h-fit w-full flex border-l  hover:shadow-sm  rounded-xl">
            {" "}
            <div className="flex justify-start w-full flex-col ">
              <div className="flex flex-col items-start gap-4 p-8">
                <div className="">
                  <div className="font-bold text-[#2676BC] relative w-fit text-xl flex items-center gap-1">
                    {" "}
                    Offer:
                    <div className=" absolute -right-24 px-6 bg-blue-50 !text-blue-600 border-blue-600 capitalize border rounded-full py-[2px] text-sm">
                      {reservationDetails.status}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 pt-4">
                    <div className="font-semibold">Location:</div>
                    <p className="">{reservationDetails.location}</p>
                  </div>
                  <div className="flex flex-row gap-3 pt-4">
                    <div className="font-semibold">Date:</div>
                    <div className="flex">
                      <p className="">
                        {dayjs(reservationDetails.start_date).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                      <span className="px-2">-</span>
                      <p className="">
                        {dayjs(reservationDetails.end_date).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full justify-start">
                  <Link to={`/chats?${reservationDetails?.uuid}`}>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
                      Chat
                    </button>
                  </Link>

                  {opentoAcceptoffer?.offered_by_me === false &&
                    opentoAcceptoffer?.status === "open" && (
                      <>
                        <div
                          onClick={() =>
                            setTerms({ ...terms, toggle: !terms.toggle })
                          }
                        >
                          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
                            Accept
                          </button>
                        </div>

                        <Link to={`/counter-offer?${reservationDetails?.uuid}`}>
                          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-2">
                            Counter
                          </button>
                        </Link>
                      </>
                    )}
                </div>
                <div className="flex flex-row gap-3 pt-4">
                  <div className="font-semibold">Description:</div>
                  <p className="">{reservationDetails?.description}</p>
                </div>
              </div>

              {/* reservation offer section  */}
              {reservationDetails?.offered_by_me ? (
                <div className="flex items-start gap-4 flex-col px-8 pb-8 w-full">
                  <div className="font-semibold">
                    {reservationDetails?.pay_rate}$ /{" "}
                    {reservationDetails?.pay_duration} offer to :
                  </div>
                  <div className="flex items-center pt-3 gap-4">
                    <div className=" !rounded-full overflow-hidden w-14 h-14">
                      {reservationDetails?.offered_to?.photo_url != null ? (
                        <img src={reservationDetails?.offered_to?.photo_url} />
                      ) : (
                        <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                          <p className="">
                            {reservationDetails?.offered_to?.about_me}
                          </p>
                          <p className="">
                            {reservationDetails?.offered_to?.about_me}
                          </p>
                          {reservationDetails.offered_to?.firstname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <p className="font-bold text-xl capitalize">
                        {reservationDetails.offered_to?.firstname}{" "}
                        {reservationDetails.offered_to?.lastname}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4 flex-col px-8 pb-8 w-full">
                  <div className="font-semibold">
                    {reservationDetails?.pay_rate}$ /{" "}
                    {reservationDetails?.pay_duration} offer by :
                  </div>
                  <div className="flex items-center pt-3 gap-4">
                    <div className=" !rounded-full overflow-hidden w-14 h-14">
                      {reservationDetails?.offered_by?.photo_url != null ? (
                        <img src={reservationDetails?.offered_by?.photo_url} />
                      ) : (
                        <div className="w-14 h-14 flex justify-center capitalize items-center bg-slate-700 text-white">
                          <p className="">
                            {reservationDetails?.offered_by?.about_me}
                          </p>
                          <p className="">
                            {reservationDetails?.offered_by?.about_me}
                          </p>
                          {reservationDetails.offered_by?.firstname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <p className="font-bold text-xl capitalize">
                        {reservationDetails.offered_by?.firstname}{" "}
                        {reservationDetails.offered_by?.lastname}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border"></div>
            {reservationDetails?.counterOffers?.map((item, index) => (
              <div className="flex justify-start w-full flex-col p-8 ">
                <div className="flex flex-col items-start gap-4 pb-4 ">
                  <div className="">
                    <p className="font-bold text-[#2676BC] text-xl">
                      {" "}
                      Offer History,
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4 flex-col p-7 border rounded-lg w-full">
                    <div className="  -right-24 -mt-3 px-6 bg-blue-50 !text-blue-600 border-blue-600 capitalize border rounded-full py-[2px] text-sm">
                      {item.status}
                    </div>
                    <div className="flex flex-row justify-between  gap-3">
                      <div className="font-semibold text-[#2676BC]">
                        Counter Offer: {item?.pay_rate}$ / {item?.pay_duration}
                      </div>
                      <div className="font-semibold items-center flex">
                        Date:
                        <div className="flex px-2">
                          {dayjs(item.start_date).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start pt-3 gap-4">
                      <div className="font-bold text-xl capitalize">
                        Made By: {item?.offered_to?.firstname}{" "}
                        {item?.offered_to?.lastname}
                      </div>
                      <div className="flex justify-start">
                        Notes:
                        <p className="">{item?.offered_to?.about_me}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {terms.toggle && (
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"></div>
      )}
      {terms.toggle && (
        <div className="h-screen inset-0 flex justify-center items-center w-full fixed z-50  m-auto">
          <div className="w-full max-w-[600px] flex flex-col fixed justify-start items-start p-8 z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
            <div className="text-xl pb-4">{"Add Additional Terms"}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-base mt-2 text-neutral-600">
                  Additional Terms
                </p>
                <textarea
                  className="text-md placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  value={terms.termsText}
                  onChange={(e) =>
                    setTerms({ ...terms, termsText: e.target.value })
                  }
                  placeholder="Write Something"
                  variant="outlined"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full justify-end mt-8">
              <button
                className="profile-save-btn"
                onClick={() => handleReviewSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
