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
      start_date: dayjs(startDate).format("DD-MM-YYYY"),
      end_date: dayjs(endDate).format("DD-MM-YYYY"),
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
        <div className="flex m-auto flex-col justify-center h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
          <div className=" justify-center items-center text-neutral-700 flex w-full">
            <div className="text-2xl md:text-3xl">Make a Counter Offer</div>
          </div>
          <div className="">
            <div className="md:w-[80vw] bg-white px-10 py-8 rounded-md mx-auto mt-4 md:mt-10 flex flex-col gap-3 md:gap-5  ">
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
                          value={startDate}
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
                          value={endDate}
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
                      <select
                        value={payDuration}
                        onChange={(e) => setPayDuration(e.target.value)}
                        className="text-lg bg-transparent placeholder-[#B8C0CB] text-neutral-800 py-[15px] -mt-0.5 focus:outline-none px-4 border border-[#C2C9D4] rounded w-full"
                      >
                        <option value={"hourly"}>Hourly Rate</option>
                        <option value={"daily"}>Daily Rate</option>
                        <option value={"fixed"}>Fixed</option>
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
                    <CommonPrimaryButton
                      onClick={() => reserveUser()}
                      loading={button_loading}
                      text={"   Submit Offer"}
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
