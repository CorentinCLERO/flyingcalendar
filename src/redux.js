import { configureStore, createSlice } from "@reduxjs/toolkit";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: [
    {
      id: 1,
      title: 'ezrzerze',
      date: 'Tue Oct 31 2023',
      startTime: '01:17',
      endTime: '15:17',
      color: "#6200EE",
      comments: "un commentaire"
    }
  ],
  reducers: {
    addMeeting: (state, action) => {
      // {type: "meetings/addMeeting", paylod: {title: 'ezrzerze',date: 'Tue Oct 24 2023',startTime: '11:17',endTime: '12:17',color: "#6200EE",comments: "un commentaire"}}
      const newMeeting = {
        id: state.length === 0 ? 1 : Math.max(...state.map(task => task.id)) + 1,
        title: action.payload.title,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        color: action.payload.color,
        comments: action.payload.comments,
      }
      state.push(newMeeting)
    },
    updateMeeting: (state, action) => {
      // {type: "meetings/updateMeeting", paylod: {id: idachanger,title: 'ezrzerze',date: 'Tue Oct 24 2023',startTime: '11:17',endTime: '12:17',color: "#6200EE",comments: "un commentaire"}}
      const meetingIndex = state.findIndex(m => m.id === action.payload.id);
      if (meetingIndex !== -1) {
        state[meetingIndex] = {
          ...state[meetingIndex], // copie toutes les propriétés de l'ancienne réunion
          title: action.payload.title,
          date: action.payload.date,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          color: action.payload.color,
          comments: action.payload.comments
        };
      }
    },
    deleteMeeting: (state, action) => {
      // {type: "meetings/deleteMeeting", paylod: idachanger}}
      return state.filter(m => m.id !== action.payload);
    },
  },
})

export const { addMeeting, updateMeeting, deleteMeeting } = meetingsSlice.actions;

export const store = configureStore({
  reducer: {
    todo: meetingsSlice.reducer
  }
})