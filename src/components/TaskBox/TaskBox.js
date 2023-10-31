import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color'
import './TaskBox.css'
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addMeeting, deleteMeeting, updateMeeting } from '../../redux';
import { parse, setHours, setMinutes } from 'date-fns';

const TaskBox = ({ daySelected, setOverlayIsOpen, meeting, setMeetingSelected }) => {

  const getCurrentDateWithMeetingTime = (timeString) => {
    const currentDate = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    return setMinutes(setHours(currentDate, hours), minutes);
  }

  const [hexColor, setHexColor] = useState(meeting?.color ? meeting.color : "#00FFDA")
  const [title, setTitle] = useState(meeting?.title ? meeting.title : "")
  const [date, setDate] = useState(meeting?.date ? new Date(meeting.date) : format(new Date(daySelected), 'EEE MMM d yyyy'))
  const [startTime, setStartTime] = useState(meeting?.startTime ? getCurrentDateWithMeetingTime(meeting.startTime) : new Date())
  const [endTime, setEndTime] = useState(meeting?.endTime ? getCurrentDateWithMeetingTime(meeting.endTime) : new Date(new Date().getTime() + 60 * 60 * 1000))
  const [comments, setComments] = useState(meeting?.comments ? meeting.comments : "")
  const [errorMessage, setErrorMessage] = useState("")
  const [colorPicker, setColorPicker] = useState(false)
  const isMeeting = Object.keys(meeting).length > 0;

  useEffect(() => {
    if (!colorPicker && hexToRgb(hexColor) > 600) setHexColor("#00FFDA")
  }, [colorPicker, hexColor])

  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return r + g + b;
  }

  const handleTextareaChange = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    setComments(textarea.value)
  }

  const dispatch = useDispatch();

  const addNewMeeting = () => {
    let startTimeFormat = formatTimeToHHMM(startTime)
    let endTimeFormat = formatTimeToHHMM(endTime)
    let dateFormat = formatDateToEEEMMMddyyyy(date)
    const parsedStartTime = parse(startTimeFormat, 'HH:mm', new Date());
    const parsedEndTime = parse(endTimeFormat, 'HH:mm', new Date());

    if (title.length === 0) {
      setErrorMessage('You have to add a title');
      return;
    }
    if (!(parsedEndTime > parsedStartTime)) {
      setErrorMessage('End time must be greater than start time');
      return;
    }
    setOverlayIsOpen(false);
    const newMeeting = {
      title: title,
      date: dateFormat,
      startTime: startTimeFormat,
      endTime: endTimeFormat,
      color: hexColor,
      comments: comments
    };
    dispatch(addMeeting(newMeeting));
  };

  const updateTheMeeting = (task) => {
    let startTimeFormat = formatTimeToHHMM(startTime)
    let endTimeFormat = formatTimeToHHMM(endTime)
    let dateFormat = formatDateToEEEMMMddyyyy(date)
    const parsedStartTime = parse(startTimeFormat, 'HH:mm', new Date());
    const parsedEndTime = parse(endTimeFormat, 'HH:mm', new Date());
    if (title.length === 0) {
      setErrorMessage('You have to add a title');
      return;
    }
    if (!(parsedEndTime > parsedStartTime)) {
      setErrorMessage('End time must be greater than start time');
      return;
    }
    setOverlayIsOpen(false);
    const updtMeeting = {
      id: task.id,
      title: title,
      date: dateFormat,
      startTime: startTimeFormat,
      endTime: endTimeFormat,
      color: hexColor,
      comments: comments
    };
    dispatch(updateMeeting(updtMeeting));
    setMeetingSelected({})
  };

  const deleteTheMeeting = (id) => {
    dispatch(deleteMeeting(id));
    setOverlayIsOpen(false);
    setMeetingSelected({})
  }

  const formatTimeToHHMM = (time) => {
    const dateObj = typeof time === 'string' ? parse(time, 'HH:mm', new Date()) : time;
    return format(dateObj, 'HH:mm');
  };

  const formatDateToEEEMMMddyyyy = (dateInput) => {
    let dateObj;
    if (typeof dateInput === 'string') {
      if (dateInput.includes('GMT')) {
        dateObj = new Date(dateInput);
      } else {
        dateObj = parse(dateInput, 'EEE MMM d yyyy', new Date());
      }
    } else {
      dateObj = dateInput;
    }
    return format(dateObj, 'EEE MMM d yyyy');
  };

  const writeInput = (e) => {
    setTitle(e.target.value)
    setErrorMessage('')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <div className='app__TaskBox' onClick={() => setColorPicker(false)}>
        <div className='app__TaskBox__top'>
          <div className='app__TaskBox__title'>
            <input type='text' placeholder='Add Title' value={title} onChange={(e) => writeInput(e)} />
            <div style={{ backgroundColor: hexColor + '26', borderLeft: "6px solid " + hexColor }} className='app__TaskBox__separation' />
          </div>
          <div onClick={e => e.stopPropagation()} className='app__TaskBox__container__color'>
            <div onClick={() => setColorPicker(!colorPicker)}>
              <div style={{ backgroundColor: hexColor, border: "1px solid #999" }} className='app__TaskBox__color' />
            </div>
            {colorPicker && <div style={{ position: 'fixed', zIndex: 1000 }} >
              <div onClick={() => setColorPicker(!colorPicker)} />
              <ChromePicker color={hexColor} onChange={(e) => setHexColor(e.hex)} disableAlpha={true} />
            </div>}
          </div>
        </div>
        <div className='app__TaskBox__datetime'>
          <div>
            <FontAwesomeIcon icon={faCalendar} color={hexColor} size="3x" style={{ marginRight: "3px" }} />
          </div>
          <div>
            <MobileDatePicker
              label="Date"
              defaultValue={new Date(daySelected)}
              onChange={(e) => setDate(format(e, 'EEE MMM d yyyy'))}
              sx={{
                ".MuiInputBase-root": { backgroundColor: hexColor + '26' },
                ".MuiOutlinedInput-input": { padding: '10px 14px' },
                ".MuiInputLabel-root": { padding: '0 7px', marginLeft: '-5px', backgroundColor: '#FFFFFF', borderRadius: '5px' }
              }}
            />
          </div>
        </div>
        <div className='app__TaskBox__datetime'>
          <div>
            <FontAwesomeIcon icon={faClock} color={hexColor} size="3x" />
          </div>
          <div className='app__TaskBox__TimePickers'>
            <div>
              <MobileTimePicker
                label="Start time"
                defaultValue={startTime}
                onChange={(e) => setStartTime(format(e, 'HH:mm'))}

                sx={{
                  ".MuiInputBase-root": { backgroundColor: hexColor + '26' },
                  ".MuiOutlinedInput-input": { padding: '10px 14px' },
                  ".MuiInputLabel-root": { padding: '0 7px', marginLeft: '-5px', backgroundColor: '#FFFFFF', borderRadius: '5px' }
                }}
              />
            </div>
            <div>
              <MobileTimePicker
                label="End time"
                defaultValue={endTime}
                onChange={(e) => setEndTime(format(e, 'HH:mm'))}
                sx={{
                  ".MuiInputBase-root": { backgroundColor: hexColor + '26' },
                  ".MuiOutlinedInput-input": { padding: '10px 14px' },
                  ".MuiInputLabel-root": { padding: '0 7px', marginLeft: '-5px', backgroundColor: '#FFFFFF', borderRadius: '5px' }
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <textarea
            placeholder='Comments'
            className='app__TaskBox__textarea'
            onChange={handleTextareaChange}
            value={comments}
          />
        </div>
        <div style={{ backgroundColor: hexColor + '26', borderLeft: "6px solid " + hexColor }} className='app__TaskBox__separation' />
        {
          isMeeting ?
            <div className='app__TaskBox__container__add-button'>
              {errorMessage.length > 0 && <div>            {errorMessage}          </div>}
              <button type='button' className='app__TaskBox__add-button' style={{ backgroundColor: hexColor, marginRight: '30px' }} onClick={() => updateTheMeeting(meeting)}> Modify</button>
              <button type='button' className='app__TaskBox__add-button' style={{ backgroundColor: 'red' }} onClick={() => deleteTheMeeting(meeting.id)}> Delete</button>
            </div>
            :
            <div className='app__TaskBox__container__add-button'>
              {errorMessage.length > 0 && <div>            {errorMessage}          </div>}
              <button type='button' className='app__TaskBox__add-button' style={{ backgroundColor: hexColor }} onClick={addNewMeeting}> Add</button>
            </div>
        }
      </div>
    </LocalizationProvider>
  );
};

export default TaskBox;