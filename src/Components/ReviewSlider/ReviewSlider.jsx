import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./ReviewSlider.css";

export default function ReviewSlider() {
  return (
    <div className="review-slider-container">
      <h3 className="review-heading">Reviews:</h3>

      <div className="slides-container">
        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <p className="review-desc w-full break-words">
            Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
             gravida.
          </p>
        </div>

        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>

        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>

        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>

        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>

        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>
        <div className="slide1">
          <div style={{ display: "flex" }}>
            <div className="slide-image-container"></div>
            <div style={{ marginLeft: "1.2rem", marginTop: "0.2rem" }}>
              <p className="user-review">Alex Martinez</p>
              <div style={{ marginTop: ".5rem" }} className="flex">
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
                <AiFillStar className="review-stars" />
              </div>
            </div>
          </div>
          <div>
            <p className="review-desc">
              Viverra ipsum nunc aliquet bibendum <br /> enim facilisis
               gravida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
