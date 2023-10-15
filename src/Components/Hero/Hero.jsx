import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/images/heroimage.png";
import Form from "../Form/Form";

export default function Hero() {
  return (
    <div className=" bg-[#e5f0ff] flex py-12 pb-60">
      <div className="main-container flex justify-between">
        <div className="flex flex-col mb-auto relative">
          <div className="flex flex-col pb-40  ">
            <h1 className="text-6xl font-bold leading-[1.42] whitespace-nowrap">
              Healthcare professionals <br />
              <span>Ready to hire.</span>
            </h1>
            <p className="text-neutral-500 text-lg mt-5">
              Pulvinar elementum integer enim neque. Et netus et malesuada fames
              ac turpis. Lectus nulla at volutpat diam ut.
            </p>
          </div>
          <div className="absolute -bottom-72 shadow-md hover:scale-105 transition-all ease-in-out duration-500 hover:shadow-lg w-full max-w-[700px]">
            {" "}
            <Form />
          </div>
        </div>
        <div className="opacity-0 !relative left-8">
          <img src={HeroImage} alt="Hero Image" />
        </div>
      </div>
      <div className="!absolute mt-[115px] -right-0 w-[810px]">
        <img src={HeroImage} alt="Hero Image" />
      </div>
    </div>
  );
}
