import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CommonPrimaryButton from "../CommonPrimaryButton";

export default function NewOffer() {
  const location = useLocation();
  const [openAcceptoffer, setOpenToAcceptOffer] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counterLocation, setLocation] = useState("");
  const [payDuration, setPayDuration] = useState("");
  const [button_loading, setButtonLoading] = useState(false);
  const reservations = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(location, "here is the location");

    handleAPIRequest(
      "get",
      `reservation/${location.search.split("?")[1]}`,
      null
    )
      .then((response) => {
        if (response.data) {
          let parentReservation = [response.data.reservation];

          let counterOffers = response.data.reservation.counterOffers;

          if (counterOffers.length) {
            counterOffers.map((item) => {
              parentReservation.push(item);
            });
          }

          let opentoAcceptoffer = parentReservation.find(
            (item) => item.status === "open"
          );

          if (opentoAcceptoffer) {
            setOpenToAcceptOffer(opentoAcceptoffer);
            setStartDate(dayjs(opentoAcceptoffer.start_date));
            setEndDate(dayjs(opentoAcceptoffer.end_date));
            setPrice(opentoAcceptoffer.pay_rate);
            setLocation(opentoAcceptoffer.location);
            setDescription(opentoAcceptoffer.description);
            setPayDuration(opentoAcceptoffer.pay_duration);
          }
        }
      })
      .catch((error) => {});
    console.log(startDate, dayjs(openAcceptoffer.end_date));
  }, [user, location]);

  const reserveUser = () => {
    setButtonLoading(true);
    let data = {
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      end_date: dayjs(endDate).format("YYYY-MM-DD"),
      pay_rate: price,
      pay_duration: payDuration?.toLowerCase(),
      location: counterLocation,
      description: description,
      account_uuid: user.accounts[0].uuid,
      uuid: location.search.split("?")[1],
    };

    handleAPIRequest(
      "POST",
      `counter-offer/${location.search.split("?")[1]}`,
      data
    )
      .then((response) => {
        console.log(response);
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
      });

    console.log(data, "here is the payload ");
  };

  const handleStartDateChange = (date) => {
    setStartDate(dayjs(date));
  };
  const handleEndDateChange = (date) => {
    setEndDate(dayjs(date));
  };
  function DateIcon(props) {
    return (
      <div className="px-2 py-1.5 rounded-md bg-blue-700 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-calendar-days"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
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
    );
  }
  return (
    <>
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <div class="boxes">
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex m-auto flex-col justify-center overflow-auto w-full">
          <div className=" justify-center items-center text-neutral-700 flex w-full">
            <div className="text-2xl md:text-3xl">Make a Counter Offer</div>
          </div>
          <div className="">
            <div className="xl:w-[60vw] bg-white px-10  rounded-md mx-auto mt-4 md:mt-10 flex flex-col gap-3 md:gap-5  ">
              <div className="flex gap-12 lg:gap-12 mb-6">
                <div className="flex items-center gap-5 border p-4 w-full rounded-lg">
                  <span className="text-blue-600">Offer by:</span>
                  <div className="flex items-center gap-4">
                    <div className=" !rounded-full overflow-hidden w-8 h-8">
                      <div className="w-8 h-8 flex justify-center items-center capitalize  bg-[#39B7A5] text-white">
                        {openAcceptoffer?.offered_by?.firstname.charAt(0)}
                      </div>

                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="">
                      <p className="font-semibold text-base text-neutral-800 capitalize">
                        {openAcceptoffer?.offered_by?.firstname}{" "}
                        {openAcceptoffer?.offered_by?.lastname}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5 border p-4 w-full rounded-lg">
                  <span className="text-blue-600">Offer to:</span>
                  <div className="flex items-center gap-4">
                    <div className=" !rounded-full overflow-hidden w-8 h-8">
                      <div className="w-8 h-8 flex justify-center items-center capitalize  bg-blue-500 text-white">
                        {openAcceptoffer?.offered_to?.firstname?.charAt(0)}
                      </div>

                      {/* <GoPrimitiveDot className='online-icon'/> */}
                    </div>
                    <div className="">
                      <p className="font-semibold text-base text-neutral-800 capitalize">
                        {openAcceptoffer?.offered_to?.firstname}{" "}
                        {openAcceptoffer?.offered_to?.lastname}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-12 lg:gap-24">
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-800">
                    Start Date
                  </p>

                  <div className="relative w-full">
                    <LocalizationProvider
                      className="w-full"
                      dateAdapter={AdapterDayjs}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              padding: "12px",
                              // Your other styles for the Paper component
                            },
                          }}
                          onChange={handleStartDateChange}
                          defaultValue={startDate}
                          value={startDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                          slots={{
                            openPickerIcon: DateIcon,
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-800">
                    End Date
                  </p>
                  <div className="relative w-full">
                    <LocalizationProvider
                      className="w-full"
                      dateAdapter={AdapterDayjs}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              padding: "12px",
                              // Your other styles for the Paper component
                            },
                          }}
                          onChange={handleEndDateChange}
                          defaultValue={endDate}
                          value={endDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                          Props={{
                            sx: {
                              ".MuiPaper-root": {
                                padding: "6px",
                              },
                            },
                          }}
                          slots={{
                            openPickerIcon: DateIcon,
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 justify-between gap-12 lg:gap-24">
                <div className=" flex flex-col gap-2 w-full">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-800">
                    Location
                  </p>
                  <div className="relative w-full">
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      value={counterLocation}
                      placeholder="Select Location"
                      className="text-lg placeholder-[#B8C0CB] text-neutral-500 f-f-g-m py-2 px-4 border border-[#C2C9D4] rounded w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full ">
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-800">
                      Rate
                    </p>
                    <div className="relative w-full">
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter Value"
                        type="number"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-500 f-f-g-m py-2 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  /{" "}
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-800">
                      Rate
                    </p>
                    <div className="relative w-full text-neutral-500">
                      <select
                        value={payDuration}
                        onChange={(e) => setPayDuration(e.target.value)}
                        className="text-lg bg-transparent placeholder-[#B8C0CB] text-neutral-500 f-f-g-m py-[11px] -mt-0.5 focus:outline-none px-4 border border-[#C2C9D4] rounded w-full"
                      >
                        <option value={"hourly"}>Hourly Rate</option>
                        <option value={"daily"}>Daily Rate</option>
                        <option value={"fixed"}>Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 pt-4 flex-col">
                <div className="w-full flex flex-col gap-2">
                  <div>
                    <p className="font-semibold pb-5 text-base/none lg:text-xl/none text-neutral-800">
                      Description
                    </p>
                    <div className="relative w-full">
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Describe your self"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-500 f-f-g-m py-2 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  <div className="w-auto flex justify-center items-center mt-4">
                    <CommonPrimaryButton
                      onClick={() => reserveUser()}
                      loading={button_loading}
                      text={"   Send Offer"}
                      classes="px-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
