import React, { useState } from 'react';
import './clock.css';

const Clock = () => {
    //Use States
    const [clockinClicked, setClockinClicked] = useState(false); //Clock in button enable/disable
    const [clockoutClicked, setClockoutClicked] = useState(false); //Clock out button enable/disbale
    const [clockinTime, setClockinTime] = useState(""); //Clock in time
    const [clockoutTime, setClockoutTime] = useState(""); //Clock out time
    const [calculatedTime, setCalculatedTime] = useState(""); //Calculated time

    const getClockinTime = () => {
        if (!clockinClicked) {
            const date = new Date();
            const showTime = "Clock-in Time: " + date.getHours() 
                + ':' + date.getMinutes() 
                + ":" + date.getSeconds();
            setClockinTime(showTime);
            setClockinClicked(true);
        }
    }
    
    const getClockoutTime = () => {
        if (!clockoutClicked && clockinClicked) {
            const date = new Date();
            const showTime = "Clock-out Time: " + date.getHours() 
                + ':' + date.getMinutes() 
                + ":" + date.getSeconds();
            setClockoutTime(showTime);
            setClockoutClicked(true);
            calculateWorkedTime(clockinTime, showTime);
        }
    }

    const calculateWorkedTime = (start, end) => {

        //Console log for debugging
        console.log(start);
        console.log(end);
    
        //Set string for times
        const clockinTimeStr = start.substring(start.indexOf(":") + 2);
        const clockoutTimeStr = end.substring(end.indexOf(":") + 2);
    
        //Reformat so it can calculate 
        const clockinDate = new Date("January 1, 2024 " + clockinTimeStr);
        const clockoutDate = new Date("January 1, 2024 " + clockoutTimeStr);
    
        //Calculate time difference
        const timeDiff = clockoutDate - clockinDate;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        console.log("difference: " + timeDiff);
        setCalculatedTime(`${hours} hours ${minutes} minutes`); //Set time 
    }

    return (
        <div>
            <main>
                <div className="header">
                    <h1 className="header-text">Name: </h1>
                    <h2 className="status-text">
                        Status: 
                    </h2>
                </div>
                <div className="clockin-container">
                    <h3 name="clockin-time">{clockinTime}</h3>
                    <button class="clockin-Btn" onClick={getClockinTime} disabled={clockinClicked}>Clock In</button>
                </div>
                <div className="clockout-container">
                    <h3 name="clockout-time">{clockoutTime}</h3>
                    <button class="clockout-Btn" onClick={getClockoutTime} disabled={!clockinClicked || clockoutClicked}>Clock Out</button>
                </div>
                <div className="logout-container">
                    <h3 name="calculated-time">{calculatedTime}</h3>
                    <button class="logout-Btn" onClick={() => {setClockinClicked(false); setClockoutClicked(false);}}>Logout</button>
                </div>
            </main>

        </div>
    );
}

export default Clock;