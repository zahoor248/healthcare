import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DayPicker.css";
import { FaTrashAlt } from "react-icons/fa";

const DayPicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (

       <div className="datepicker-area">

       <h4>Date:</h4>
       <FaTrashAlt className="del-date"/>

      <DatePicker className="availability-picker" 
        selected={startDate} 
        onChange={(date) => setStartDate(date)}/>

        </div> 
    );
  };


  export default DayPicker;