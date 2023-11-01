import React, { useState, useEffect } from 'react';
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

  function getProcessedTasks(meetings, daySelected) {
    const dayTasks = meetings.filter(task => format(new Date(task.date), 'dd MMMM') === format(daySelected, 'dd MMMM'));

    const overlappingTasks = [];
    dayTasks.forEach(task => {
      const overlapping = dayTasks.filter(otherTask => {
        return (timeStringToNumber(otherTask.startTime) < timeStringToNumber(task.endTime) &&
          timeStringToNumber(otherTask.endTime) > timeStringToNumber(task.startTime));
      });
      overlappingTasks.push({
        ...task,
        overlappingCount: overlapping.length,
        overlappingIndex: overlapping.indexOf(task)
      });
    });

    return overlappingTasks;
  }

  const processedTasks = getProcessedTasks(meetings, daySelected);

  const [percentage, setPercentage] = useState(calculatePercentage(window.innerWidth));

  useEffect(() => {
    function handleResize() {
      setPercentage(calculatePercentage(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculatePercentage(screenWidth) {
    if (screenWidth <= 900) {
      return 86;
    } else if (screenWidth <= 1350) {
      return 90;
    } else {
      return 95;
    }
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
          {processedTasks.map(task => (
            <div key={task.id} onClick={() => displayTask(task)}>
              {format(new Date(task.date), 'dd MMMM') === format(daySelected, 'dd MMMM') &&
                <div
                  className="app__Tasks__task"
                  style={{
                    top: `${(timeStringToNumber(task.startTime) * 100) / 2400}%`, // position de départ de la tâche
                    height: `${(timeStringToNumber(task.endTime) - timeStringToNumber(task.startTime)) * 100 / 2400}%`, // hauteur de la tâche                
                    backgroundColor: task.color + '26',
                    borderLeft: '6px solid ' + task.color,
                    width: `calc(${percentage}% / ${task.overlappingCount})`,
                    left: `calc((${percentage}% / ${task.overlappingCount}) * ${task.overlappingIndex})`,
                  }}
                >
                  <div className='app__Tasks__task__description' >
                    {task.title}
                  </div>
                  <div >
                    <button
                      className="app__Tasks__task__close-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(deleteMeeting(task.id));
                      }}
                    >
                      x
                    </button>
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