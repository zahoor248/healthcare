import React from "react";
import "./Features.css";
import BlueShape from "../../assets/images/blue-shape.png";
import GreenShape from "../../assets/images/green-shape.png";
import YellowShape from "../../assets/images/yellow-shape.png";

export default function Features() {
  return (
    <div className="main-container gap-3 flex justify-between pt-52">
      <div className="border-2 border-[#C2C9D4] rounded-tl-[100px] max-w-[416px] ">
        <div className="">
          <img src={BlueShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-3xl font-bold f-f-g-b -mt-8">
            Verified Healthcare Professionals
          </h3>
        </div>
        <p className="pb-24 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
      <div className="border-2 border-[#C2C9D4] rounded-tl-[100px] max-w-[416px] ">
        <div className="">
          <img src={GreenShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-3xl font-bold f-f-g-b -mt-8">
            Scheduling and Reservation Online
          </h3>
        </div>
        <p className="pb-24 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
      <div className="border-2 border-[#C2C9D4] rounded-tl-[100px] max-w-[416px] ">
        <div className="">
          <img src={YellowShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-3xl font-bold f-f-g-b -mt-8">
            Open Access to Professionals <br />
            <span className="text-2xl">(no middle man)</span>
          </h3>
        </div>
        <p className="pb-24 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
    </div>
  );
}
