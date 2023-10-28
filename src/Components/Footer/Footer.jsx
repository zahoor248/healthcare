import React from "react";

import { BsDot } from "react-icons/bs";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];

  let hideHeader = ["login", "register"];
  return (
    <>
      {!hideHeader.includes(routePath) && (
        <div className="bg-[#10274f] fixed bottom-0 w-full">
          <div className="main-container flex flex-col md:flex-row text-white md:items-center justify-between py-8 gap-2 md:gap-0 h-fit">
            <p className="text-white text-xs sm:text-base">
              © 2023 HealthcareUp. All rights reserved.
            </p>
            <ul className="flex flex-row md:items-center sm:gap-2 gap-1 text-xs sm:text-base">
              <li className="flex items-center" style={{ cursor: "pointer" }}>
                {" "}
                <span>
                  {" "}
                  <BsDot className="text-lg md:hidden -ml-1.5 md:-ml-0" />
                </span>{" "}
                Terms of Use
              </li>
              <li>
                <BsDot className="text-lg hidden md:block" />
              </li>
              <li className="flex items-center" style={{ cursor: "pointer" }}>
                {" "}
                <span>
                  {" "}
                  <BsDot className="text-lg  md:hidden" />
                </span>{" "}
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
