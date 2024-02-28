import React from 'react'
import CreateEventButton from './CreateEventButton.jsx'
import Labels from './Labels.jsx';
export default function SidebarCalendar() {
  return (
    <div>
      <aside className='create-event-btn'>
          <CreateEventButton/>
      </aside>
      <div className='labels-container'>
        <Labels/>
      </div>
    </div>
  );
}
