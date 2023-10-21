import React from "react";

import { BsDot } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-[#10274f]">
      <div className="main-container flex text-white items-center justify-between py-8">
        <p className="text-white text-xs sm:text-base">
          © 2023 HealthcareUp. All rights reserved.
        </p>
        <ul className="flex flex-col sm:flex-row items-center sm:gap-2 gap-1 text-xs sm:text-base">
          <li className="flex items-center" style={{ cursor: "pointer" }}>
            {" "}
            <span>
              {" "}
              <BsDot className="text-lg  sm:hidden" />
            </span>{" "}
            Terms of Use
          </li>
          <li>
            <BsDot className="text-lg hidden sm:block" />
          </li>
          <li className="flex items-center" style={{ cursor: "pointer" }}>
            {" "}
            <span>
              {" "}
              <BsDot className="text-lg  sm:hidden" />
            </span>{" "}
            Privacy Policy
          </li>
        </ul>
      </div>
    </div>
  );
}
