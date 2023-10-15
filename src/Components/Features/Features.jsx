import React from 'react';
import './Features.css';
import BlueShape from '../../assets/images/blue-shape.png';
import GreenShape from '../../assets/images/green-shape.png';
import YellowShape from '../../assets/images/yellow-shape.png';

export default function Features() {
  return (
    <div className='features-container'>
        <div className='first-feature'>
            <div className='card-header'>
                <img src={BlueShape} alt="Blue Color Shape"/>
                <h3>Verified Healthcare Professionals</h3>
            </div>
            <p className='feature-desc'>Pulvinar elementum integer enim neque.
                Et netus et malesuada fames ac turpis.
                Lectus nulla at volutpat diam ut.
            </p>
        </div>

        <div className='first-feature'>
            <div className='card-header'>
                <img src={GreenShape} alt="Blue Color Shape"/>
                <h3>Scheduling and Reservation Online</h3>
            </div>
            <p className='feature-desc'>Pulvinar elementum integer enim neque.
                Et netus et malesuada fames ac turpis.
                Lectus nulla at volutpat diam ut.
            </p>
        </div>

        <div className='first-feature'>
            <div className='card-header'>
                <img src={YellowShape} alt="Blue Color Shape"/>
                <h3>Open Access to Professionals 
                    <br/><span style={{fontSize:"1.3rem"}}>(no middle man)</span></h3>
            </div>
            <p className='feature-desc'>Pulvinar elementum integer enim neque.
                Et netus et malesuada fames ac turpis.
                Lectus nulla at volutpat diam ut.
            </p>
        </div>
    </div>
  )
}
