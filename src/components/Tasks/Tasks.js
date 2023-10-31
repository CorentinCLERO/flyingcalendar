import React from 'react';
import './Tasks.css';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeeting } from '../../redux';

const Tasks = ({ daySelected, setOverlayIsOpen, setMeetingSelected }) => {

  const hours = Array.from({ length: 25 }).map((_, i) => i).filter(hour => hour % 2 === 0);
  const meetings = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  function timeStringToNumber(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 100) + (minutes * (5 / 3));
  }

  function displayTask(task) {
    setOverlayIsOpen(true);
    setMeetingSelected(task)
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
          {meetings.map(task => (
            <div key={task.id}>
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
                  <div className='app__Tasks__task__description' onClick={() => displayTask(task)}>
                    {task.title}
                  </div>
                  <button
                    className="app__Tasks__task__close-btn"
                    onClick={() => dispatch(deleteMeeting(task.id))}
                  >
                    x
                  </button>
                </div>}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Tasks;