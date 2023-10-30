import CalendarF from "./components/CalendarF/CalendarF";
import Tasks from "./components/Tasks/Tasks";
import "./app.css";
import { startOfDay } from "date-fns";
import { useState } from "react";
import TaskBox from "./components/TaskBox/TaskBox";
import Overlay from "./components/Overlay/Overlay";

function App() {

  let today = startOfDay(new Date());
  const [daySelected, setDaySelected] = useState(today)
  const [overlayIsOpen, setOverlayIsOpen] = useState(true)

  return (
    <div className="app__display">
      <Overlay overlayIsOpen={overlayIsOpen} setOverlayIsOpen={setOverlayIsOpen} >
        <TaskBox />
      </Overlay>
      <Tasks daySelected={daySelected} setOverlayIsOpen={setOverlayIsOpen} />
      <CalendarF today={today} daySelected={daySelected} setDaySelected={setDaySelected} />
    </div>
  );
}

export default App;
