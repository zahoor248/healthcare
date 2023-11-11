import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/images/heroimage.png";
import Form from "../Form/Form";

export default function Hero() {
  return (
    <section class="!pt-12  2xl:!pt-20 banner-area">
      <div class=" main-container">
        <div class="row">
          <div class="col-12">
            <div class="banner-inner">
              <div class="banner-text">
                <h2 className="2xl:text-6xl md:text-4xl text-3xl font-bold leading-[1.3] md:!leading-[1.42] whitespace-nowrap">
                  Healthcare professionals <br /> Ready to hire.
                </h2>
                <p className="text-neutral-500 text-lg mt-2 md:mt-5">
                  Pulvinar elementum integer enim neque. Et netus et malesuada
                  fames <br /> ac turpis. Lectus nulla at volutpat diam ut.
                </p>
              </div>
              <div class="banner-img-mobile lg:hidden">
                <img src={HeroImage} alt="img" />
              </div>
              <div className="opacity-0 -mt-24 xl:mt-4  -bottom-72 hover:scale-105 transition-all ease-in-out duration-500 w-full max-w-fit xl:max-w-[600px] 2xl:max-w-[700px]">
                {" "}
                <Form />
              </div>
              <div className="absolute z-50 -bottom-24 hover:scale-105 transition-all ease-in-out duration-500 w-[83vw] mx-3 md:mx-0 md:max-w-[550px] xl:max-w-[650px]  2xl:max-w-[700px]">
                {" "}
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-img hidden lg:block">
        <img src={HeroImage} alt="img" />
      </div>
    </section>
  );
}
