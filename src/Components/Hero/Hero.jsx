import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/images/heroimage.png";

export default function Hero() {
  return (
    <div className=" bg-[#e5f0ff] flex">
      <div className="main-container flex justify-between">
        <div className="flex flex-col my-auto">
          <h1 className="text-6xl font-bold leading-[1.42]">Healthcare professionals Ready to hire.</h1>
          <p>
            Pulvinar elementum integer enim neque. Et netus et malesuada fames
            ac turpis. Lectus nulla at volutpat diam ut.
          </p>
        </div>
      </div>
        <div className=" !relative left-8">
          <img src={HeroImage} alt="Hero Image" />
        </div>
    </div>
  );
}
