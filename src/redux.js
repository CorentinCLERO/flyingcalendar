import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('meetingsState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('meetingsState', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: loadState() || [
    {
      id: 1,
      title: 'Rendu du test technique',
      date: 'Wed Nov 01 2023',
      startTime: '10:00',
      endTime: '14:00',
      color: "#00FFDA",
      comments: "J'espère que tu vas aimer ce projet, si tu as une question je suis disponible"
    }
  ],
  reducers: {
    addMeeting: (state, action) => {
      const newMeeting = {
        id: state.length === 0 ? 1 : Math.max(...state.map(task => task.id)) + 1,
        title: action.payload.title,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        color: action.payload.color,
        comments: action.payload.comments,
      }
      state.push(newMeeting);
      saveState(state);
    },
    updateMeeting: (state, action) => {
      const meetingIndex = state.findIndex(m => m.id === action.payload.id);
      if (meetingIndex !== -1) {
        state[meetingIndex] = {
          ...state[meetingIndex],
          title: action.payload.title,
          date: action.payload.date,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          color: action.payload.color,
          comments: action.payload.comments
        };
      }
      saveState(state);
    },
    deleteMeeting: (state, action) => {
      const newState = state.filter(m => m.id !== action.payload);
      saveState(newState);
      return newState;
    },
  },
})

export const { addMeeting, updateMeeting, deleteMeeting } = meetingsSlice.actions;

export const store = configureStore({
  reducer: {
    todo: meetingsSlice.reducer
  }
});
