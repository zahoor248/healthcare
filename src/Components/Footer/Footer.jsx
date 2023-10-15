import React from 'react';
import './Footer.css';
import { BsDot } from "react-icons/bs";

export default function Footer() {
  return (
    <div className='footer-container'>
        <p className='copyrights'>© 2022 HealthcareUp. All rights reserved.</p>
        <ul className='footer-list'>
            <li style={{cursor:"pointer"}}>Terms of Use</li>
            <li><BsDot className='dot-icon'/></li>
            <li style={{cursor:"pointer"}}>Privacy Policy</li>
        </ul>
    </div>
  )
}
