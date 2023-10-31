import React, { useEffect, useState } from 'react';
import './CalendarF.css';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  subDays,
  getDay,
  addDays,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
} from 'date-fns';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CalendarF = ({ today, daySelected, setDaySelected, meetings }) => {

  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  useEffect(() => {
    setCurrentMonth(format(daySelected, 'MMM-yyyy'));
  }, [daySelected])

  // Trouvez le lundi correspondant
  let startDay = firstDayCurrentMonth;
  while (getDay(startDay) !== 1) {
    startDay = subDays(startDay, 1);
  }

  // Trouvez le dernier dimanche du mois précédent
  let endDay = endOfWeek(endOfMonth(firstDayCurrentMonth));
  while (getDay(endDay) !== 0) {
    endDay = addDays(endDay, 1);
  }

  let newDays = eachDayOfInterval({
    start: startDay,
    end: endDay,
  });

  const buttonStyle = (day) => {
    let baseStyle = 'app__CalendarF__day-button'
    if (!isSameMonth(day, firstDayCurrentMonth)) { baseStyle += ' other-month' }
    if (isToday(day) && !isEqual(day, daySelected)) { baseStyle += ' today' }
    if (isEqual(day, daySelected)) { baseStyle += ' app__CalendarF__day-button__selected' }
    if (hasMeetingOnDay(day)) { baseStyle += ' has-meeting'; }
    return baseStyle
  }

  function hasMeetingOnDay(day) {
    return meetings.some(meeting => {
      return isEqual(parse(meeting.date, 'EEE MMM dd yyyy', new Date()), day);
    });
  }

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return (
    <div className="app__CalendarF">
      <div className='app__CalendarF__header'>
        <FontAwesomeIcon icon={faChevronLeft} color='white' size="2x" className="app__CalendarF__icon" onClick={previousMonth} />
        <div className='app__CalendarF__date'>
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </div>
        <FontAwesomeIcon icon={faChevronRight} color='white' size="2x" className="app__CalendarF__icon" onClick={nextMonth} />
      </div>
      <hr className='app__CalendarF__separation' />
      <div className='app__CalendarF__day'>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className='app__CalendarF__day-buttons'>
        {newDays.map((day, dayIndex) => (
          <div key={dayIndex}>
            <button type='button' className={buttonStyle(day)} onClick={() => setDaySelected(day)}>
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarF;
