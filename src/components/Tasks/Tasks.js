import React from 'react';
import './Tasks.css';
import { format } from 'date-fns';

const Tasks = ({ daySelected, setOverlayIsOpen }) => {

  const meeting = [
    {
      title: "Coutts personal appointement",
      date: "Sun Oct 29 2023",
      startTime: "02:00",
      endTime: "05:00",
      color: "#b3b175",
    },
    {
      title: "Coutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointement",
      date: "Sun Oct 29 2023 00:00:00 GMT+0200 (heure d’été d’Europe centrale)",
      startTime: "08:00",
      endTime: "09:00",
      color: "#63b675",
    },
    {
      title: "Coutts personal appointementCoutts personal appointementCoutts personal appointementCoutts personal appointement",
      date: "Sun Oct 30 2023",
      startTime: "10:00",
      endTime: "24:00",
      color: "#631675",
    },
  ]

  const hours = Array.from({ length: 25 }).map((_, i) => i).filter(hour => hour % 2 === 0);

  function timeStringToNumber(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 100) + (minutes * (5 / 3));
  }

  return (
    <div className='app__Tasks'>
      <div className='app__Tasks__header'>
        <div className='app__Tasks__date-selected'>
          {format(daySelected, 'dd MMMM')}
        </div>
        <button className='app__Tasks__add-button' onClick={() => setOverlayIsOpen(true)}>+</button>
      </div>
      <hr className='app__Tasks__separation' />
      <div className='app__Tasks__days'>
        {hours.map(hour => (
          <div key={hour} className='app__Tasks__day'>
            <div className='app__Tasks__hour'>
              {hour}:00
            </div>
            <div className='app__Tasks__line'>
              <hr />
            </div>
          </div>
        ))}
        <div className="app__Tasks__tasks">
          {meeting.map(task => (
            <div key={task.title}>
              {format(new Date(task.date), 'dd MMMM') === format(daySelected, 'dd MMMM') &&
                <div
                  className="app__Tasks__task"
                  style={{
                    top: `${(timeStringToNumber(task.startTime) * 100) / 2400}%`, // position de départ de la tâche
                    height: `${(timeStringToNumber(task.endTime) - timeStringToNumber(task.startTime)) * 100 / 2400}%`, // hauteur de la tâche                
                    backgroundColor: task.color + '26',
                    borderLeft: '6px solid ' + task.color,
                  }}
                >
                  <div className='app__Tasks__task__description'>
                    {task.title}
                  </div>
                </div>}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Tasks;