import React, { useState } from "react";
import "./ProfileDetails.css";
import { AiOutlineStar, AiFillStar, AiOutlineIdcard } from "react-icons/ai";
import { TbCurrencyDollar } from "react-icons/tb";
import { FaMapPin } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import DaySelect from "../DaySelect/DaySelect";
import Header from "../Header/Header";
import CommonInput from "../ReusableComponents/CommonInput";

export default function ProfileDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="flex flex-col xl:flex-row shadow-md">
        <div className="basis-2/5 pt-12 col-span-2">
          <div style={{ display: "flex", paddingLeft: "5rem" }}>
            <div className="border border-gray-300 w-40 h-40 bg-gray-300 rounded-lg"></div>
            <div className="ml-8 mt-4">
              <p className="profile-user-name text-2xl text-blue-900">
                Mathew Bryant
              </p>
              <p className="profile-designation text-sm text-gray-300 mt-1">
                ADON
              </p>
              <button className="contact-profile-btn text-white bg-blue-700 border border-blue-700 rounded-md py-1.5 px-4 mt-6 cursor-pointer hover:border-blue-900 hover:bg-white hover:text-blue-700 transition-all ease-in-out duration-500">
                Contact this Pro
              </button>
            </div>
          </div>

          <div className="border-b border-blue-300 w-full mt-12"></div>

          <div className="">
            <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-4 2xl:gap-0 pl-20 mt-10 mb-10">
              <div className="flex flex-col">
                <div className="flex">
                  <AiOutlineStar className="star-icon" />
                  <div className="ml-4">
                    <p className="text-lg text-gray-600 mb-2">Ratings</p>
                    <div className="flex">
                      <AiFillStar
                        style={{ fontSize: "1.2rem", color: "#F2BC27" }}
                      />
                      <AiFillStar
                        style={{ fontSize: "1.2rem", color: "#F2BC27" }}
                      />
                      <AiFillStar
                        style={{ fontSize: "1.2rem", color: "#F2BC27" }}
                      />
                      <AiFillStar
                        style={{ fontSize: "1.2rem", color: "#F2BC27" }}
                      />
                      <AiFillStar
                        style={{ fontSize: "1.2rem", color: "#F2BC27" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex" style={{ marginTop: "1.5rem" }}>
                  <AiOutlineIdcard className="text-[2.5rem] text-blue-700" />
                  <div className="ml-4">
                    <p className="rating-heading">Licensed in</p>
                    <p className="license-areas">CT, MA, RI, TN</p>
                  </div>
                </div>
              </div>

              <div className="border-right"></div>

              <div className="profile-column2">
                <div className="rating-section">
                  <TbCurrencyDollar className="dollar-icon" />
                  <div className="rating-text">
                    <p className="rating-heading">Rates</p>
                    <p className="license-areas">$100/day, $50/hr</p>
                  </div>
                </div>

                <div className="rating-section" style={{ marginTop: "1.5rem" }}>
                  <FaMapPin className="pin-icon" />
                  <div className="rating-text">
                    <p className="rating-heading">Radius</p>
                    <p className="license-areas">50 miles from 06415</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-about-text ">
          <div className="about-text">
            <h3>About Mathew</h3>
            <p className="about-pro-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Neque
              gravida in fermentum et sollicitudin ac orci. At tellus at urna
              condimentum mattis pellentesque id nibh. Vitae justo eget magna
              fermentum iaculis eu non vitae magna ac orci gravida Neque gravida
              in fermentum et non tellus urna at. Platea dictumst quisque
              sagittis purus sit amet volutpat consequat mauris. In aliquam sem
              fringilla ut morbi tincidunt augue interdum. Condimentum mattis
              pellentesque id nibh tortor id aliquet lectus. Tempor id eu.
              Malesuada proin libero nunc consequat. In dictum non consectetur a
              erat. Curabitur vitae nunc sed velit dignissim sodales. Diam sit
              amet nisl suscipit. Elementum tempus egestas sed sed risus pretium
              quam vulputate. Luctus venenatis lectus magna fringilla. Pulvinar
              pellentesque habitant morbi tristique senectus. Purus sit amet
              luctus venenatis lectus magna fringilla urna porttitor. Nisl
              pretium fusce id velit ut tortor pretium viverra suspendisse.
              Nullam eget felis eget nunc lobortis mattis aliquam faucibus
              purus. Donec enim diam vulputate ut.
            </p>
          </div>
        </div>

        <div className="profile-working-hours ">
          <div className="working-hrs-space"></div>
          <p className="working-hrs">Preferred Working Hours</p>
          <div className="working-day-section w-full">
            <div
              className="responsive-days w-full xl:w-[12rem]"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="days-container w-full">
                <p>Sunday</p>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
              </div>
            </div>

            <div
              className="responsive-hrs w-full xl:w-[14rem]"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="hrs-container w-full">
                <p>11 am - 5 pm</p>
                <p>8 am - 9 pm</p>
                <p>9 am - 6 pm</p>
                <p>9 am - 6 pm</p>
                <p>9 am - 6 pm</p>
                <p>9 am - 6 pm</p>
                <p>9 am - 6 pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="review-section-container">
        <h3 className="review-heading ml-20">Select:</h3>
        <div className="w-[80vw] bg-white px-10 py-8 rounded-md mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6 shadow-xl">
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
              First Name
            </p>
            <div className="relative w-full">
              <input
                placeholder="First Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
              First Name
            </p>
            <div className="relative w-full">
              <input
                placeholder="First Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
              First Name
            </p>
            <div className="relative w-full">
              <input
                placeholder="First Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-base/none lg:text-xl/none pb-2 text-neutral-600">
              First Name
            </p>
            <div className="relative w-full">
              <input
                placeholder="First Name"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="review-section-container">
        <ReviewSlider />
      </div>
    </>
  );
}
