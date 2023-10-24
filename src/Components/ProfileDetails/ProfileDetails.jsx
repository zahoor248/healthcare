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
      <div className="profile-details-container">
        <div className="profile-user-about">
          <div style={{ display: "flex", paddingLeft: "5rem" }}>
            <div className="avatar-img"></div>

            <div className="profile-user-text">
              <p className="profile-user-name">Mathew Bryant</p>
              <p className="profile-designation">ADON</p>
              <button className="contact-profile-btn transition-all ease-in-out duration-500">
                Contact this Pro
              </button>
            </div>
          </div>

          <div className="profile-border-bottom"></div>

          <div className="profile-attributes">
            <div className="profile-columns">
              <div className="profile-column1">
                <div className="rating-section">
                  <AiOutlineStar className="star-icon" />
                  <div className="rating-text">
                    <p className="rating-heading">Ratings</p>
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

                <div className="rating-section" style={{ marginTop: "1.5rem" }}>
                  <AiOutlineIdcard className="license-icon" />
                  <div className="rating-text">
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
        <div className="border-b3"></div>

        <div className="profile-about-text">
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

        <div className="profile-working-hours">
          <div className="working-hrs-space"></div>
          <p className="working-hrs">Preferred Working Hours</p>
          <div className="working-day-section">
            <div
              className="responsive-days"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "12rem",
              }}
            >
              <div className="days-container">
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
              className="responsive-hrs"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "14rem",
              }}
            >
              <div className="hrs-container">
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

      <div className=" shadow px-20">
        <div className="">
          <h3 className="select-date-heading">Select Date</h3>
          <div className="responsive-fields" style={{ display: "flex" }}>
            <div className="month-selection"></div>

            <div className="responsive-flex">
              <div
                className="responsive-days-start"
                style={{ position: "relative", marginLeft: "3rem" }}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div
                className="responsive-days-end"
                style={{
                  position: "relative",
                  marginLeft: "3rem",
                  marginTop: "2.8rem",
                }}
              >
                <p className="end-days">End</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
          </div>

          <div className="price-container">
            <CommonInput label={"Price"} value={price} setValue={setPrice} />
            <div className="price-field location-field">
              <p>Location</p>
              <input
                type="text"
                placeholder="Lorem Ipsum"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="price-container">
            <div className="desc-field">
              <p>Description</p>
              <textarea
                className="pro-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div> */}

          {/* <div className="pro-btn-container">
            <button className="reserve-pro-btn">Reserve this Pro</button>
          </div> */}
        </div>
      </div>

      <div className="review-section-container">
        <ReviewSlider />
      </div>
    </>
  );
}
