import CalendarF from "./components/CalendarF/CalendarF";
import Tasks from "./components/Tasks/Tasks";
import "./app.css";
import { startOfDay } from "date-fns";
import { useState } from "react";

function App() {

  let today = startOfDay(new Date());
  const [daySelected, setDaySelected] = useState(today)

  return (
    <div className="app__display">
      <Tasks />
      <CalendarF today={today} daySelected={daySelected} setDaySelected={setDaySelected} />
    </div>
  );
}

export default App;
