import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/images/heroimage.png";
import Form from "../Form/Form";

export default function Hero() {
  return (
    //   <div className="bg-[#e5f0ff] flex flex-col lg:flex-row h-[70vh]">
    //   <div className="main-container flex flex-col lg:flex-row justify-between">
    //     <div className="flex flex-col mb-auto relative lg:w-[50%]">
    //       <div className="flex flex-col pb-20 xl:pb-44">
    //         <h1 className="2xl:text-6xl md:text-4xl text-3xl font-bold leading-[1.3] md:!leading-[1.42] whitespace-nowrap">
    //           Healthcare professionals <br />
    //           <span>Ready to hire.</span>
    //         </h1>
    //         <p className="text-neutral-500 text-lg mt-2 md:mt-5">
    //           Pulvinar elementum integer enim neque. Et netus et malesuada fames ac turpis. Lectus nulla at volutpat diam ut.
    //         </p>
    //       </div>
    //       <div className="absolute -bottom-72 hover:scale-105 transition-all ease-in-out duration-500 w-full max-w-[700px]">
    //         {" "}
    //         <Form />
    //       </div>
    //     </div>
    //     <div className="opacity-0 !relative left-8 hidden lg:block lg:w-[50%]">
    //       <img src={HeroImage} alt="Hero Image" />
    //     </div>
    //   </div>
    //   <div className="!absolute  mt-[135px] z-0 -right-0 hidden lg:block w-[44%]">
    //     <img src={HeroImage} alt="Hero Image" />
    //   </div>
    // </div>

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
              <div className="opacity-0 -mt-16 xl:mt-4  -bottom-72 hover:scale-105 transition-all ease-in-out duration-500 w-full max-w-fit xl:max-w-[600px] 2xl:max-w-[700px]">
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
