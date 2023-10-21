import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker"
import "./DaySelect.css";

export default function DaySelect() {
  const [value, setValue] = useState(new Date())

  return (
    <Calendar 
      className="day-select-calendar"
      value={value}
      onChange={setValue}
      multiple={true}
    />
  )
}