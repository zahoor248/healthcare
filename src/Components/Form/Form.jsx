import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import { BiSearch } from "react-icons/bi";

export default function Form() {
  const [profession, setProfession] = useState("");
  const [userType, setUserType] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <div className="bg-white shadow-class rounded-xl z-50 ">
      <div className="p-9 ">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-6 items-center text-2xl font-semibold">
            <p className="whitespace-nowrap f-f-n-b ">I am a</p>
            <input
              type="text"
              placeholder="e-g -Lorem, Dolor"
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-8 border border-[#C2C9D4] rounded w-full"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-6 items-center text-2xl font-semibold">
            <p className="whitespace-nowrap f-f-n-b ">Looking for</p>
            <input
              type="text"
              placeholder="e-g -Lorem, Dolor"
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-8 border border-[#C2C9D4] rounded w-full"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-6 items-center text-2xl font-semibold max-w-[400px] w-full">
            <p className="whitespace-nowrap f-f-n-b ">In zip code</p>
            <input
              type="text"
              placeholder="In zip code"
              value={zipCode}
              className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-8 border border-[#C2C9D4] rounded w-full pr-8"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Link className="w-full md:w-auto" to="/listing">
            <button className="px-8  justify-center  mt-8 w-full lg:mt-0 gap-1 rounded-lg text-white py-4 bg-blue-500 hover:bg-blue-600 transition-all  ease-in-out duration-500 flex items-center ">
              <BiSearch className="text-2xl" />
              Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
