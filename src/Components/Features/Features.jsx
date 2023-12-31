import React from "react";
import "./Features.css";
import BlueShape from "../../assets/images/blue-shape.png";
import GreenShape from "../../assets/images/green-shape.png";
import YellowShape from "../../assets/images/yellow-shape.png";

export default function Features() {
  return (
    <div className="main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch items-center md:justify-center gap-8 md:gap-3 lg:justify-between pt-32 lg:pt-52">
      <div className="border-2 border-[#C2C9D4] rounded-tl-[100px] w-full md:max-w-[416px] transition-all ease-in-out duration-400 hover:shadow-md">
        <div className="">
          <img src={BlueShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-xl md:text-2xl lg:text-3xl font-bold f-f-g-b -mt-8">
            Verified Healthcare Professionals
          </h3>
        </div>
        <p className="pb-16 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-sm md:text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
      <div className="border-2 border-[#C2C9D4] rounded-tl-[100px] w-full md:max-w-[416px] transition-all ease-in-out duration-400 hover:shadow-md">
        <div className="">
          <img src={GreenShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-xl md:text-2xl lg:text-3xl font-bold f-f-g-b -mt-8">
            Scheduling and Reservation Online
          </h3>
        </div>
        <p className="pb-16 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-sm md:text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
      <div className="border-2 md:mx-auto md:col-span-full lg:col-span-1 border-[#C2C9D4] rounded-tl-[100px] w-full md:max-w-[416px] transition-all ease-in-out duration-400 hover:shadow-md">
        <div className="">
          <img src={YellowShape} alt="Blue Color Shape" />
          <h3 className="pl-[90px] pr-[40px] text-xl md:text-2xl lg:text-3xl font-bold f-f-g-b -mt-8">
            Open Access to Professionals <br />
            <span className="text-lg md:text-2xl">(no middle man)</span>
          </h3>
        </div>
        <p className="pb-16 pl-[90px] pr-[30px] font-normal f-f-g-m pt-4 text-sm md:text-base text-neutral-600">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
    </div>
  );
}
