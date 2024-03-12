import React, { useState, useEffect } from "react";
import "./Preferences.css";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { setUser } from "../../Store/Actions/Actions";
import Toast from "../AppLoader";
import CommonPrimaryButton from "../CommonPrimaryButton";

export default function Preferences() {
  const user = useSelector((state) => state.user);
  const WEEK_DAYS = [
    {
      day: "Sun",
      name: "Sunday",
      id: "3",
    },
    {
      day: "Mon",
      name: "Monday",
      id: "4",
    },
    {
      day: "Tues",
      name: "Tuesday",
      id: "5",
    },
    {
      day: "Wed",
      name: "Wednesday",
      id: "6",
    },
    {
      day: "Thu",
      name: "Thursday",
      id: "7",
    },
    {
      day: "Fri",
      name: "Friday",
      id: "1",
    },
    {
      day: "Sat",
      name: "Saturday",
      id: "2",
    },
  ];

  const [preferences, setPreferences] = useState({
    hourly_rate: user.pro_profile?.hourly_rate || "",
    daily_rate: user.pro_profile?.daily_rate || "",
    radius: user.pro_profile?.radius || "",
  });

  const [workingHours, setWorkingHours] = useState(
    user.pro_profile?.working_hours ||
      WEEK_DAYS.map((day) => ({
        id: day.id,
        day: day.day,
        fromTime: "",
        toTime: "",
      }))
  );

  const [selectedDay, setSelectedDay] = useState(null);

  const [editedFromTime, setEditedFromTime] = useState("00:00");
  const [editedToTime, setEditedToTime] = useState("00:00");
  const [applyToAll, setApplyToAll] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });
  const dispatch = useDispatch();
  const openModalForDay = (day) => {
    setSelectedDay(day);
    setEditedFromTime(day.fromTime);
    setEditedToTime(day.toTime);
  };

  const handleSave = () => {
    console.log(selectedDay.id);
    setWorkingHours((prevWorkingHours) =>
      prevWorkingHours.map((item) =>
        applyToAll || item.id === selectedDay.id
          ? { ...item, fromTime: editedFromTime, toTime: editedToTime }
          : item
      )
    );
    setApplyToAll(false);
    setSelectedDay(null);

    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      working_hours: workingHours,
    }));
  };

  const savePreferences = () => {
    setButtonLoader(true);

    // Assuming handleAPIRequest is a function that makes an API call
    handleAPIRequest("POST", "pro-profile", {
      ...preferences,
      working_hours: workingHours,
      account_uuid: user.accounts[0].uuid,
    })
      .then((response) => {
        handleAPIRequest("get", "user", null).then((response) => {
          dispatch(setUser(response.user.profile));
          setButtonLoader(false);
          setShowToast({
            ...showToast,
            toggle: true,
            status: "success",
            message: "Prefrences has been updated successfully",
            lable: "Prefrences Updated",
          });
          setTimeout(() => {
            setShowToast({
              ...showToast,
              toggle: false,
              status: "success",
              message: "Prefrences has been updated successfully",
              lable: "Prefrences Updated",
            });
          }, 2000);
        });
      })
      .catch((error) => {});
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = minutes || "00";
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <div className="w-full flex flex-col gap-4 py-12">
      <div className="profile-editing-header flex justify-between w-full items-center">
        <div className="flex items-center">
          {/* <MdLocationOn className="edit-box-icon" /> */}
          <p className="my-profile-text">Job Prefrences</p>
        </div>
      </div>
      <div className="bg-white shadow-class rounded-lg h-full p-8 flex flex-col overflow-auto">
        {/* inputs  */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">
              Hourly Rate
            </p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Hourly Rate"
              value={preferences.hourly_rate}
              placeholder="Enter Rate Here..."
              onChange={(e) =>
                setPreferences({ ...preferences, hourly_rate: e.target.value })
              }
              variant="outlined"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">
              Daily Rate
            </p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Zip Code"
              placeholder="Enter Rate Here..."
              value={preferences.daily_rate}
              onChange={(e) =>
                setPreferences({ ...preferences, daily_rate: e.target.value })
              }
              variant="outlined"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">
              Radius
            </p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Address"
              placeholder="Enter Radius"
              value={preferences.radius}
              onChange={(e) =>
                setPreferences({ ...preferences, radius: e.target.value })
              }
              variant="outlined"
            />
          </div>
        </div>

        {/* Visitings chips  */}

        <div className="flex  pt-10 flex-col">
          <div className="text-xl font-medium text-neutral-700">
            Visiting Hours
          </div>
          <div className="flex items-center pt-6 gap-3 flex-wrap">
            {workingHours.map((item) => (
              <div
                key={item.day}
                onClick={() => openModalForDay(item)}
                className="flex cursor-pointer rounded-md px-8 hover-shadow transition-all ease-in-out py-4 border items-center gap-2"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="capitalize text-md text-neutral-800">
                    {item.day}
                  </p>
                  <span className="text-neutral-600 text-sm">
                    {item.fromTime} - {item.toTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for adding/editing address */}
        {selectedDay && (
          <div
            onClick={() => setSelectedDay(null)}
            className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"
          ></div>
        )}
        {selectedDay && (
          <>
            <div className="w-full max-w-[600px] flex flex-col fixed p-8 z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
              <div className="text-xl font-medium pb-4 capitalize">
                Working Hours For {selectedDay.day}
              </div>

              <div className="modal-content flex flex-col gap-4">
                <div>
                  <label>Start Time:</label>
                  <input
                    type="time"
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                    value={editedFromTime}
                    pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
                    onChange={(e) => setEditedFromTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>End Time:</label>
                  <input
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                    type="time"
                    value={editedToTime}
                    pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
                    onChange={(e) => setEditedToTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-neutral-600 pt-4 flex items-center gap-4">
                <label className="switch">
                  <input
                    onChange={(e) => setApplyToAll(e.target.checked)}
                    type="checkbox"
                  />
                  <span className="slider"></span>
                </label>

                <div> Do this for all</div>
              </div>
              <div className="flex items-center gap-2 w-full justify-end mt-6">
                <button
                  className="text-[#0f75bc] border-[#0f75bc] border px-6 py-3 rounded-md "
                  onClick={() => setSelectedDay(null)}
                >
                  Cancel
                </button>
                <button
                  className=" hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-7 py-3.5  bg-[#0f75bc] text-white rounded-md  "
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center gap-2 w-full justify-end mt-12">
          <CommonPrimaryButton
            loading={buttonLoader}
            onClick={() => savePreferences()}
            text={"Update"}
            className="  hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md  "
          ></CommonPrimaryButton>
        </div>
      </div>{" "}
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
}
