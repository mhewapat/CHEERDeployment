import React, { useContext, useState } from 'react'
import './eventm.css'
import { MdOutlineDragHandle } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import GlobalContext from '../../context/GlobalContext';
import { MdOutlineSchedule } from "react-icons/md";
import { MdSegment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dayjs from 'dayjs';
import { func } from 'joi';

const labelsClasses = ['indigo','gray','green','blue','red','purple'];

export default function EventModel() {
    const { setShowEventModel, daySelected, setDaySelected, dispatchCallEvent, selectedEvent } = useContext(GlobalContext);
    const [ title, setTitle ] = useState(selectedEvent ? selectedEvent.title : "");
    const [ description, setDescription ] = useState(selectedEvent ? selectedEvent.description: '');
    const [ selectedLabel, setSelectedLabel ] = useState(selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]);
    //setDaySelected(dayjs())
    function handleSubmit(e){
        e.preventDefault();
        const calendarEvent = {
            // id: 'primary', 
            // groupId: '',
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(), //timestamp
            id: selectedEvent ? selectedEvent.id : Date.now(),
            // start: startDate,
            // end: endDate,
            // allDay: allDayBool,
            // daysOfWeek: daysOfWeekRepeats,
            // startTime: startTime,
            // endTime: endTime,
            // endRecur: endRecurDate,
            // classNames: 'calendar-events',
            // editable: editable,
            // color: color,
        };
        if(selectedEvent){
            dispatchCallEvent({type: 'update', payload: calendarEvent});//updating new event 
           
        }else{
            dispatchCallEvent({type: 'push', payload: calendarEvent});//pushing new event 
        }
        setShowEventModel(false);
       
    }
    return (
        <div className='event-form-container'>
            <form className='event-form'>
                <header className='event-form-header'>
                    <span className='icons'>
                        <MdOutlineDragHandle />
                    </span>
                    <div>
                        {selectedEvent && (
                            <span onClick={() => {
                                dispatchCallEvent({type: 'delete', payload: selectedEvent});
                                setShowEventModel(false);
                                }} className='icons'>
                                 <MdDelete />
                            </span>
                        )}
                        <button onClick={() => setShowEventModel(false)}>
                            <span className='icons'>
                                 <IoIosClose />
                            </span>
                        </button>
                    </div>
                 

                </header>
                <div className='div-container-event-box'>
                    <div className='grid-event-container-box'>
                        <div></div>
                        <input className='event-form-input-title' type="text" name='title' placeholder='Add title' value={title} required onChange={(e) => setTitle(e.target.value)}/>
                        <span className='schedule-icon-form-event'>
                            <MdOutlineSchedule/>
                        </span>
                        <p className='bottom-date-event-form'>{daySelected.format('dddd, MMMM DD')}</p>
                        <span className='schedule-icon-form-event'>
                            <MdSegment />
                        </span>
                        <input className='event-form-input-description' type="text" name='description' placeholder='Add Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <span className='schedule-icon-form-event'>
                            <MdOutlineBookmarkBorder />
                        </span>
                        <div className="color-labels-container ">
                            {labelsClasses.map((lblClass,i) => (
                                <span key={i} onClick={() => setSelectedLabel(lblClass)} className={`color-labels ${lblClass}`}>
                                    {selectedLabel === lblClass && 
                                     <span className='check-icon'>
                                        <FaCheck/>
                                     </span>
                                    }
                                   
                                    
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className='event-form-footer'>
                    <button type='submit' onClick={handleSubmit} className='event-form-footer-submit-btn'>
                        Save
                    </button>

                </footer>
            </form>

        </div>
    )
}
