import React, {useContext} from 'react'
import './ch.css'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GlobalContext from '../../context/GlobalContext';
import { func } from 'joi';
import dayjs from 'dayjs';


export default function CalendarHeader() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext);
  function handlePrevMonth() {
      setMonthIndex(monthIndex - 1);//previous month index
  }
  function handleNextMonth(){
      setMonthIndex(monthIndex + 1);//next month
  }
  function handleResetCurrentMonth(){
    setMonthIndex(dayjs().month())
  }
  return (
    <header className='calendar-header-header'>
      <h1 className='calendar-header-title'>
          {}
          Calendar
      </h1>
      <button onClick={handleResetCurrentMonth} className="today-btn">
          Today
      </button>
      <button onClick={handlePrevMonth}>
          <span className='navigation-btns'>
            <MdOutlineKeyboardArrowLeft />
          </span>
      </button>
      <button onClick={handleNextMonth}>
          <span className='navigation-btns'>
              <MdOutlineKeyboardArrowRight/>
          </span>
      </button>
      <h2 className='current-month-and-year-title'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

    </header>
  )
}
