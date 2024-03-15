import React from 'react';
import './Slider.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import Slide1 from "../../assets/images/slide1.png";
import Slide2 from "../../assets/images/slide2.png";
import Slide3 from "../../assets/images/slide3.png";

export default function Slider() {
  return (
    <div className='slider-container'>
        <AwesomeSlider animation="cubeAnimation">
            <div data-src={Slide1} />
            <div data-src={Slide2} />
            <div data-src={Slide3} />
        </AwesomeSlider>
    </div>
  )
}
