import React, {useState} from 'react';
import "./Address.css";
import TextField from '@mui/material/TextField';
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

export default function Address() {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');


  return (
    <div className='profile-editing-section'>
    <div className='profile-editing-header'>
        <MdLocationOn className='edit-box-icon'/>
        <p className='my-profile-text'>Address</p>
    </div>

    <div className='profile-editing-card'>

    <div className="profile-fields">
                        <TextField 
                            className='hours-input' 
                            label="Country" 
                            variant="outlined" 
                            value={country}
                            onChange={e=> setCountry(e.target.value)}
                            
                        />

                        <TextField 
                            className='hours-input' 
                            label="State" 
                            variant="outlined" 
                            value={state}
                            onChange={e=> setState(e.target.value)}
                        />
                </div>

                <div className="profile-fields2">
                        <TextField 
                            className='hours-input' 
                            label="City" 
                            variant="outlined" 
                            value={city}
                            onChange={e=> setCity(e.target.value)}
                        />

                        <TextField 
                            className='hours-input' 
                            label="Zip Code" 
                            variant="outlined" 
                            value={zipCode}
                            onChange={e=> setZipCode(e.target.value)}
                        />
                </div>

                
                <div className="profile-fields2">
                        <TextField 
                            className='address-input' 
                            label="Address" 
                            variant="outlined" 
                            value={address}
                            onChange={e=> setAddress(e.target.value)}
                        />

                </div>
               
        <div className="profile-save-btn-container">
        <button className="profile-edit-btn2" disabled>Edit</button>
            <button className="profile-save-btn">Save</button>
        </div>

    </div>  
</div>
  )
}
