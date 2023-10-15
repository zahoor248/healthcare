import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Form.css'
import { BiSearch } from "react-icons/bi";

export default function Form() {
    const [profession, setProfession] = useState('');
    const [userType, setUserType] = useState('');
    const [zipCode, setZipCode] = useState('');

  return (
              <div className='hero-form'>
                <div className='form-responsive' style={{padding:"0 4rem", marginTop:"3rem"}}>
                    <div className='profession-field'>
                        <p>I am a</p>
                        <input 
                        type="text" 
                        placeholder="e-g -Lorem, Dolor"
                        value={profession}
                        onChange={e=> setProfession(e.target.value)}
                        />
                    </div>

                    <div className='looking-field'>
                        <p>Looking for</p>
                        <input 
                        type="text" 
                        placeholder="e-g -Lorem, Dolor"
                        value={userType}
                        onChange={e=> setUserType(e.target.value)}
                        />
                    </div>

                    <div className='zip-field'>
                        <p>In zip code</p>
                        <input 
                        type="text" 
                        placeholder="e.g - 71601, 85001"
                        value={zipCode}
                        onChange={e=> setZipCode(e.target.value)}
                        />
                    </div>

                    <div className='search-btn-container'>
                        <Link to='/HiringLayout'>
                        <button className='search-btn'><BiSearch className='search-icon'/>Search</button>
                        </Link>
                    </div>
                </div>
            </div>
  )
}
