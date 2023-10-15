import React from 'react';
import './Hero.css';
import HeroImage from "../../assets/images/heroimage.png";

export default function Hero() {
  return (
    <div className='hero-container'>
        <div className='text-section'>
            <h1>Healthcare professionals Ready to hire.</h1>
            <p>Pulvinar elementum integer enim neque. Et netus et malesuada fames ac turpis.
                Lectus nulla at volutpat diam ut.
            </p>
          
        </div>
        <div className='image-section'>
            <div className='hero-image-container'>
            <img src={HeroImage} alt="Hero Image"/>
            </div>
        </div>  
    </div>
  )
}
