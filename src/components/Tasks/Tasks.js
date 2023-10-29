import React from 'react';
import './Tasks.css';
import { format } from 'date-fns';

const Tasks = ({ daySelected }) => {

  const meeting = [
    {
      title: "Coutts personal appointement",
      startDate: "Sun Oct 29 2023",
      endDate: "Sun Oct 29 2023",
      startTime: "02:00",
      endTime: "05:00",
      color: "#b3b175",
    },
    {
      title: "Coutts personal appointement",
      startDate: "Sun Oct 29 2023",
      endDate: "Sun Oct 29 2023",
      startTime: "08:00",
      endTime: "09:00",
      color: "#63b675",
    },
    {
      title: "Coutts personal appointement",
      startDate: "Sun Oct 29 2023",
      endDate: "Sun Oct 29 2023",
      startTime: "10:00",
      endTime: "24:00",
      color: "#631675",
    },
  ]

  const hours = Array.from({ length: 25 }).map((_, i) => i).filter(hour => hour % 2 === 0);

  const tasks = [
    { startTime: 0, endTime: 3, description: "ssqasqCoutts personal appointment" },
    { startTime: 9, endTime: 10, description: "Coutts personal appointment" },
    { startTime: 12, endTime: 13, description: "Board of directors meeting" },
    { startTime: 16, endTime: 24, description: "Design workshop with John Lewis" }
  ];

  function timeStringToNumber(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 100) + (minutes * (5 / 3));
  }

  function convertHexToRgba(hex, alpha) {
    const [r, g, b] = [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div className='app__Tasks'>
      <div className='app__Tasks__header'>
        <div className='app__Tasks__date-selected'>
          {format(daySelected, 'dd MMMM')}
        </div>
        <button className='app__Tasks__add-button'>+</button>
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
            <div
              key={task.title}
              className="app__Tasks__task"
              style={{
                top: `${(timeStringToNumber(task.startTime) * 100) / 2400}%`, // position de départ de la tâche
                height: `${(timeStringToNumber(task.endTime) - timeStringToNumber(task.startTime)) * 100 / 2400}%`, // hauteur de la tâche                
                backgroundColor: convertHexToRgba(task.color, 0.3),
              }}
            >
              <div className='app__Tasks__task__description'>
                {task.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Tasks;