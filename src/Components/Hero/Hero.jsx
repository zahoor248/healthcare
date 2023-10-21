import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/images/heroimage.png";
import Form from "../Form/Form";

export default function Hero() {
  return (
    <div className=" bg-[#e5f0ff] flex py-12 pb-60">
      <div className="main-container flex justify-between">
        <div className="flex flex-col mb-auto relative">
          <div className="flex flex-col pb-44 ">
            <h1 className="lg:text-6xl md:text-5xl text-3xl  font-bold leading-[1.3] md:!leading-[1.42] whitespace-nowrap">
              Healthcare professionals <br />
              <span>Ready to hire.</span>
            </h1>
            <p className="text-neutral-500 text-lg mt-2 md:mt-5">
              Pulvinar elementum integer enim neque. Et netus et malesuada fames
              ac turpis. Lectus nulla at volutpat diam ut.
            </p>
          </div>
          <div className="absolute -bottom-72 hover:scale-105 transition-all ease-in-out duration-500 w-full max-w-[700px]">
            {" "}
            <Form />
          </div>
        </div>
        <div className="opacity-0 !relative left-8 hidden lg:block">
          <img src={HeroImage} alt="Hero Image" />
        </div>
      </div>
      <div className="!absolute mt-[115px] z-0 -right-0 hidden lg:block md:w-[20%] xl:w-[30%] 2xl:w-[44%]">
        <img src={HeroImage} alt="Hero Image" />
      </div>
    </div>
  );
}
