import React, {useState} from 'react';
import "./Availability.css";
import Patient from "../../assets/images/patient.jpg";
import { BiSearchAlt } from "react-icons/bi";
import Logo1 from "../../assets/images/logo-image.png";
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import TextField from '@mui/material/TextField';
import DayPicker from "../DayPicker/DayPicker";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function Availability() {
    const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

  return (
    <div className='availability-container'>
    <div className='appointment-sections'>

        <div className='standard-availability'>
        <h3 className='booking-heading'>Available Hours</h3>

           <div className='hours-container'>
                <div className='available-hours'>
                    <h4>Sunday:</h4>
                    <div style={{marginTop:"2rem", position:"relative"}}>
                         <TextField 
                            className='hours-input-closed' 
                            label="Closed" 
                            variant="outlined" 
                            disabled
                        />
                    </div>
                </div>

                <div className='available-hours'>
                    <h4>Monday:</h4>
                    <div className='availability-time' style={{marginTop:"2rem", position:"relative"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
       
                                <DesktopTimePicker
                                    label="Start"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <DesktopTimePicker
                                     label="End"
                                    value={value}
                                    onChange={(newValue) => {
                                     setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                     />
        
                                </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='available-hours'>
                    <h4>Tuesday:</h4>
                    <div className='availability-time' style={{marginTop:"2rem", position:"relative"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
       
                                <DesktopTimePicker
                                    label="Start"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <DesktopTimePicker
                                     label="End"
                                    value={value}
                                    onChange={(newValue) => {
                                     setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                     />
        
                                </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='available-hours'>
                    <h4>Wednesday:</h4>
                    <div className='availability-time' style={{marginTop:"2rem", position:"relative"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
       
                                <DesktopTimePicker
                                    label="Start"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <DesktopTimePicker
                                     label="End"
                                    value={value}
                                    onChange={(newValue) => {
                                     setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                     />
        
                                </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='available-hours'>
                <div className='availability-time' style={{marginTop:"2rem", position:"relative"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
       
                                <DesktopTimePicker
                                    label="Start"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <DesktopTimePicker
                                     label="End"
                                    value={value}
                                    onChange={(newValue) => {
                                     setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                     />
        
                                </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='available-hours'>
                    <h4>Friday:</h4>
                    <div className='availability-time' style={{marginTop:"2rem", position:"relative"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
       
                                <DesktopTimePicker
                                    label="Start"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <DesktopTimePicker
                                     label="End"
                                    value={value}
                                    onChange={(newValue) => {
                                     setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                     />
        
                                </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='available-hours'>
                    <h4>Saturday:</h4>
                    <div style={{marginTop:"2rem", position:"relative"}}>
                         <TextField 
                            className='hours-input-closed' 
                            label="Closed" 
                            variant="outlined" 
                            disabled
                        />
                      
                    </div>
                </div>
           </div>
        </div>

        <div className='vacations'>
            <h3 className='booking-heading'>Vacations</h3>
            
            <div className='vacation-btn-container'>
                <button className='vacation-btn'>Add Vacation</button>
            </div>
            
            <DayPicker/>

            <h3 className='booking-heading2'>Vacations Added</h3>

            <div>
            <DayPicker/>
            <DayPicker/>
            <DayPicker/>
            <DayPicker/>

            </div>

            <div className='vacation-btn-container'>
                <button className='vacation-update-btn'>Update</button>
            </div>
             
        </div>
    </div>
    </div>
  )
}
