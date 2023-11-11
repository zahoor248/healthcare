import React, { useState } from "react";
import "./Preferences.css";

export default function Preferences() {
  const DaysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [applyToAll, setApplyToAll] = useState(false);
  const [visitingHours, setVisitingHours] = useState(
    DaysOfWeek.map((day) => ({ day, start_hour: "00:00", end_hour: "00:00" }))
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [editedStartTime, setEditedStartTime] = useState("00:00");
  const [editedEndTime, setEditedEndTime] = useState("00:00");
  const [workingHours, setWorkingHours] = useState([]);

  const openModalForDay = (day) => {
    setSelectedDay(day);
    setEditedStartTime(
      visitingHours.find((item) => item.day === day).start_hour
    );
    setEditedEndTime(visitingHours.find((item) => item.day === day).end_hour);
  };

  const handleSave = () => {
    setVisitingHours((prevVisitingHours) =>
      prevVisitingHours.map((item) =>
        applyToAll || item.day === selectedDay
          ? { ...item, start_hour: editedStartTime, end_hour: editedEndTime }
          : item
      )
    );
    setApplyToAll(false);
    setSelectedDay(null);
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
              placeholder="Enter Rate Here..."
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
            {visitingHours.map((item) => (
              <div
                key={item.day}
                onClick={() => openModalForDay(item.day)}
                className="flex cursor-pointer rounded-md px-8 hover-shadow transition-all ease-in-out py-4 border items-center gap-2"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="capitalize text-md text-neutral-800">
                    {item.day}
                  </p>
                  <span className="text-neutral-600 text-sm">
                    {formatTime(item.start_hour)} - {formatTime(item.end_hour)}
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
                Working Hours For {selectedDay}
              </div>

              <div className="modal-content flex flex-col gap-4">
                <div>
                  <label>Start Time:</label>
                  <input
                    type="time"
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                    value={editedStartTime}
                    pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
                    onChange={(e) => setEditedStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>End Time:</label>
                  <input
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                    type="time"
                    value={editedEndTime}
                    pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
                    onChange={(e) => setEditedEndTime(e.target.value)}
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
          <button className="  hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md  ">
            Update
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
