import React, {useState} from 'react';
import "./BusinessProfile.css";
import { BiMessageSquareEdit } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import { ImageUpload } from '../ImageUpload/ImageUpload';

export default function BusinessProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [about, setAbout] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');

  return (
    <div className='profile-editing-section'>
    <div className='profile-editing-header'>
        <BiMessageSquareEdit className='edit-box-icon'/>
        <p className='my-profile-text'>Business Profile</p>
    </div>

    <div className='profile-editing-card'>
        <div className="profile-fields">
                <TextField 
                    className='hours-input' 
                    label="Business Name" 
                    variant="outlined" 
                    value={firstName}
                    onChange={e=> setFirstName(e.target.value)}
                />

                <TextField 
                    className='hours-input' 
                    label="Company Url" 
                    variant="outlined" 
                    value={lastName}
                    onChange={e=> setLastName(e.target.value)}
                />
        </div>

        <div className="profile-fields2">
            <textarea className='about-business' placeholder='About Business'/>
                {/* <TextField 
                    className='hours-input' 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                />

                <TextField 
                    className='hours-input' 
                    label="Phone" 
                    variant="outlined" 
                    value={phone}
                    onChange={e=> setPhone(e.target.value)}
                /> */}
        </div>

        
        <div className="profile-fields2">
                <TextField 
                    className='hours-input' 
                    label="Public Phone" 
                    variant="outlined" 
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                />

                {/* <TextField 
                    className='hours-input' 
                    label="Confirm Password" 
                    variant="outlined" 
                    value={confirmPassword}
                    onChange={e=> setConfirmPassword(e.target.value)}
                /> */}
                <ImageUpload/>
        </div>

        

        <div className="profile-save-btn-container">
            <button className="profile-save-btn">Save</button>
        </div>

    </div>  
</div>
  )
}
