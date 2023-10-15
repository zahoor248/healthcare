import React from "react";

import { BsDot } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-[#10274f]">
      <div className="main-container flex text-white justify-between py-8">
        <p className="text-white text-base">
          © 2023 HealthcareUp. All rights reserved.
        </p>
        <ul className="flex items-center gap-2 text-base">
          <li style={{ cursor: "pointer" }}>Terms of Use</li>
          <li>
            <BsDot className="text-lg" />
          </li>
          <li style={{ cursor: "pointer" }}>Privacy Policy</li>
        </ul>
      </div>
    </div>
  );
}
