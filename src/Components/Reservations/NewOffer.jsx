import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function NewOffer() {
  const location = useLocation();
  const [openToAcceptoffer, setOpenToAcceptOffer] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs(openToAcceptoffer?.start_date) || null
  );
  const [endDate, setEndDate] = useState(dayjs(openToAcceptoffer?.end_date));
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counterLocation, setLocation] = useState("");
  const [payDuration, setPayDuration] = useState("");
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
          }
        }
      })
      .catch((error) => {});
  }, [user, location]);

  const reserveUser = () => {
    let data = {
      start_date: startDate,
      end_date: endDate,
      pay_rate: price,
      pay_duration: payDuration?.toLowerCase(),
      location: counterLocation,
      description: description,
      account_uuid: user.accounts[0].uuid,
    };

    handleAPIRequest(
      "POST",
      `reservation/counter-offer/${location.search.split("?")[1]}`,
      data
    )
      .then((response) => {
        console.log(response);
      })
      .catch({});

    console.log(data, "here is the payload ");
  };

  const handleStartDateChange = (date) => {
    setStartDate(dayjs(date).format("DD-MM-YYYY"));
  };
  const handleEndDateChange = (date) => {
    setEndDate(dayjs(date).format("DD-MM-YYYY"));
  };
  return (
    <>
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <svg viewBox="0 0 240 240" height="240" width="240" class="pl">
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-330"
              stroke-dasharray="0 660"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--a"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-110"
              stroke-dasharray="0 220"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--b"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              class="pl__ring pl__ring--c"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              class="pl__ring pl__ring--d"
            ></circle>
          </svg>
        </div>
      ) : (
        <div className="flex m-auto flex-col justify-center h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
          <div className=" justify-center items-center text-neutral-700 flex w-full">
            <div className="text-3xl">Make a Counter Offer</div>
          </div>
          <div className="">
            <div className="w-[80vw] bg-white px-10 py-8 rounded-md mx-auto mt-10 flex flex-col gap-5  ">
              <div className="flex gap-6">
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
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
                          sx={{ width: "100%" }}
                          onChange={handleStartDateChange}
                          defaultValue={startDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
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
                          sx={{ width: "100%" }}
                          onChange={handleEndDateChange}
                          defaultValue={endDate}
                          slotProps={{
                            field: {
                              clearable: true,
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                  Location
                </p>
                <div className="relative w-full">
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    value={counterLocation}
                    placeholder="Select Location"
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  />
                </div>
              </div>
              <div className="flex gap-8 flex-col">
                <div className="flex gap-2 ">
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Rate
                    </p>
                    <div className="relative w-full">
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter Value"
                        type="number"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  /{" "}
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Rate
                    </p>
                    <div className="relative w-full">
                      <select className="text-lg bg-transparent placeholder-[#B8C0CB] text-neutral-800 py-[15px] -mt-0.5 focus:outline-none px-4 border border-[#C2C9D4] rounded w-full">
                        <option>Hourly Rate</option>
                        <option>Daily Rate</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div>
                    <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
                      Description
                    </p>
                    <div className="relative w-full">
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Describe your self"
                        className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                      />
                    </div>
                  </div>
                  <div className="w-auto flex justify-end items-end mt-4">
                    <button
                      onClick={() => reserveUser()}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white"
                    >
                      Submit Offer
                    </button>
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
