import CalendarF from "./components/CalendarF/CalendarF";
import Tasks from "./components/Tasks/Tasks";
import "./app.css";
import { startOfDay } from "date-fns";
import { useState } from "react";
import TaskBox from "./components/TaskBox/TaskBox";
import Overlay from "./components/Overlay/Overlay";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {

  let today = startOfDay(new Date());
  const [daySelected, setDaySelected] = useState(today)
  const [overlayIsOpen, setOverlayIsOpen] = useState(false)
  const [meetingSelected, setMeetingSelected] = useState({})

  return (
    <Provider store={store}>
      <div className="app__display">
        <Overlay overlayIsOpen={overlayIsOpen} setOverlayIsOpen={setOverlayIsOpen} setMeetingSelected={setMeetingSelected} >
          <TaskBox daySelected={daySelected} setOverlayIsOpen={setOverlayIsOpen} meeting={meetingSelected} setMeetingSelected={setMeetingSelected} />
        </Overlay>
        <Tasks daySelected={daySelected} setOverlayIsOpen={setOverlayIsOpen} setMeetingSelected={setMeetingSelected} />
        <CalendarF today={today} daySelected={daySelected} setDaySelected={setDaySelected} />
      </div>
    </Provider>
  );
}

export default App;
