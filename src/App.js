import CalendarF from "./components/CalendarF/CalendarF";
import Tasks from "./components/Tasks/Tasks";
import "./app.css";
import { startOfDay } from "date-fns";
import { useState } from "react";
import TaskBox from "./components/TaskBox/TaskBox";
import Overlay from "./components/Overlay/Overlay";

function App() {

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

  let today = startOfDay(new Date());
  const [daySelected, setDaySelected] = useState(today)
  const [overlayIsOpen, setOverlayIsOpen] = useState(true)

  return (
    <div className="app__display">
      <Overlay overlayIsOpen={overlayIsOpen} setOverlayIsOpen={setOverlayIsOpen} >
        <TaskBox daySelected={daySelected} />
      </Overlay>
      <Tasks daySelected={daySelected} setOverlayIsOpen={setOverlayIsOpen} meeting={meeting} />
      <CalendarF today={today} daySelected={daySelected} setDaySelected={setDaySelected} />
    </div>
  );
}

export default App;
