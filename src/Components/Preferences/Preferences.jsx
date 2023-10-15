import React, {useState} from 'react';
import "./Preferences.css";
import { HiUserCircle, HiPencilAlt, HiChatAlt2, HiHeart, HiStar } from "react-icons/hi";
import { BiMessageSquareEdit } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import { AiOutlineSetting } from "react-icons/ai";

export default function Preferences() {
    const [radius, setRadius] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [dailyRate, setDailyRate] = useState('');

  return (
    <div className='profile-editing-section'>
        <div className='profile-editing-header'>
            <AiOutlineSetting className='edit-box-icon'/>
            <p className='my-profile-text'>Preferences</p>
        </div>
    
        <div className='profile-editing-card'>
            <div className="profile-fields-pref">
                    <TextField 
                        className='hours-input' 
                        label="Radius" 
                        variant="outlined" 
                        value={radius}
                        onChange={e=> setRadius(e.target.value)}
                    />
            </div>

            <div className="profile-fields-pref">
                    <TextField 
                        className='hours-input' 
                        label="$ Hourly Rate" 
                        variant="outlined" 
                        value={hourlyRate}
                        onChange={e=> setHourlyRate(e.target.value)}
                    />
            </div>

            <div className="profile-fields-pref">
                    <TextField 
                        className='hours-input' 
                        label="$ Daily Rate" 
                        variant="outlined" 
                        value={dailyRate}
                        onChange={e=> setDailyRate(e.target.value)}
                    />
            </div>
    
            <div className="profile-save-btn-container">
                <button className="profile-save-btn">Save</button>
            </div>
    
        </div>  
    </div>
  )
}
