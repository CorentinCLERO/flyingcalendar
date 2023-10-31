import CalendarF from "./components/CalendarF/CalendarF";
import Tasks from "./components/Tasks/Tasks";
import "./app.css";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import TaskBox from "./components/TaskBox/TaskBox";
import Overlay from "./components/Overlay/Overlay";

function App() {

  let today = startOfDay(new Date());
  const [daySelected, setDaySelected] = useState(today)
  const [overlayIsOpen, setOverlayIsOpen] = useState(false)
  const [meetings, setMeetings] = useState([])
  const [maxId, setMaxId] = useState(1)
  console.log(meetings)

  useEffect(() => {
    if (meetings.length > 0) {
      const highestId = Math.max(...meetings.map(meeting => meeting.id));
      setMaxId(highestId + 1);
    }
  }, [meetings]);


  return (
    <div className="app__display">
      <Overlay overlayIsOpen={overlayIsOpen} setOverlayIsOpen={setOverlayIsOpen} >
        <TaskBox daySelected={daySelected} setMeetings={setMeetings} setOverlayIsOpen={setOverlayIsOpen} id={maxId} />
      </Overlay>
      <Tasks daySelected={daySelected} setOverlayIsOpen={setOverlayIsOpen} meetings={meetings} setMeetings={setMeetings} />
      <CalendarF today={today} daySelected={daySelected} setDaySelected={setDaySelected} meetings={meetings} />
    </div>
  );
}

export default App;
