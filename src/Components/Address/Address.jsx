import React, { useState } from "react";
import "./Address.css";
import TextField from "@mui/material/TextField";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

export default function Address() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className=" w-full flex flex-col gap-8 py-12">
      <div className="profile-editing-header">
        <MdLocationOn className="edit-box-icon" />
        <p className="my-profile-text">Address</p>
      </div>
      <div className="bg-white shadow-lg h-full p-8 flex flex-col">
        <div className="grid grid-cols-2 gap-4 w-full ">
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">Country</p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Country"
              variant="outlined"
              
              placeholder="Enter your Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">State</p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="State"
              variant="outlined"
              placeholder="Enter your state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">City</p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="City"
              placeholder="Enter your City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">Zip Code</p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Zip Code"
              placeholder="Enter Zip Code"
              variant="outlined"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base/none font-normal text-neutral-600">Address</p>
            <input
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              label="Address"
              placeholder="Enter your address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full justify-end mt-12">
          <button className="profile-save-btn" disabled>
            Edit
          </button>
          <button className="profile-save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
