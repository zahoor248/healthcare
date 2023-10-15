import React, {useState} from 'react';
import './Sidebar.css';
import FilterIcon from '../../assets/images/filter-solid.png';
import TagSelector from '../TagSelector/TagSelector';
import PriceRange from '../PriceRange/PriceRange';

export default function Sidebar() {
    const [check, setCheck] = useState('');

  return (
    <div className='sidebar-container'>
        <div className='filter-head'>
                <img className="filter-head-img" src={FilterIcon} alt="filter icon"/>
                <p className="filter-text">Filters</p>
                </div>

                <div className="border-filter"></div>

                <div className='tag-section'>
                    <div className='tags'>
                <p className="tag-text">Tags</p>
                </div>

                <div className='tag-selector'>
                <TagSelector/>
                </div>

                </div>

                <div className='license-section'>

                <div className='tags'>
                <p className="license-text">License</p>
                </div>
                
                <div className="license-list">

                <div className="license-selector">
                    <input 
                    className="check-box" 
                    type="checkbox"
                    value={check}
                    onChange={e=> setCheck(e.target.value)}
                    />
                    <p className="license1">Lorem Ipsum</p>
                </div>

                <div className="license-selector2">
                    <input 
                    className="check-box" 
                    type="checkbox"
                    value={check}
                    onChange={e=> setCheck(e.target.value)}
                    />
                    <p className="license1">Incididunt</p>
                </div>

                <div className='license-selector2'>
                    <input 
                    className="check-box" 
                    type="checkbox"
                    value={check}
                    onChange={e=> setCheck(e.target.value)}
                    />
                    <p className="license1">Consequat</p>
                </div>

                <div className="license-selector2">
                    <input 
                    className="check-box" 
                    type="checkbox"
                    value={check}
                    onChange={e=> setCheck(e.target.value)}
                    />
                    <p className="license1">Excepteur Sint</p>
                </div>

                </div>
                
                </div>

                <div className="price-section">
                <div className='tags'>
                <p className="price-text">Hourly Rate</p>
                </div>
                <PriceRange/>

                </div>

                <div className='refine-btn-container'>
                    <button className="filter-button">Refine</button>
                </div>
    </div>
  )
}
