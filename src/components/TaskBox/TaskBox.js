import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color'
import './TaskBox.css'
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';

const TaskBox = ({ daySelected, setMeetings, setOverlayIsOpen, id }) => {

  const [hexColor, setHexColor] = useState("#6200EE")
  const [title, setTitle] = useState("")
  const [colorPicker, setColorPicker] = useState(false)
  const [date, setDate] = useState(format(new Date(daySelected), 'EEE MMM d yyyy'))
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'))
  const [endTime, setEndTime] = useState(format(new Date(new Date().getTime() + 60 * 60 * 1000), 'HH:mm'))
  const [comments, setComments] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!colorPicker && hexToRgb(hexColor) > 600) setHexColor("#6200EE")
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

  const addMeeting = () => {
    if (title.length > 0) {
      setOverlayIsOpen(false);
      const newMeeting = {
        id: id,
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
        color: hexColor,
        comments: comments
      };
      setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
    } else {
      setErrorMessage('You have to add a title');
    }
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
                defaultValue={new Date()}
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
                defaultValue={new Date(new Date().getTime() + 60 * 60 * 1000)}
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
        <div className='app__TaskBox__container__add-button'>
          {errorMessage.length > 0 && <div>            {errorMessage}          </div>}
          <button type='button' className='app__TaskBox__add-button' style={{ backgroundColor: hexColor }} onClick={addMeeting}> Add</button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default TaskBox;