import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker"
import "./BookingCalendar.css";

export default function BookingCalendar() {
  const [value, setValue] = useState(new Date())

  return (
    <Calendar 
      className="booking-calendar"
      value={value}
      onChange={setValue}
      multiple={true}
    />
  )
}