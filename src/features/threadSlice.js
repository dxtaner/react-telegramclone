import { createSlice } from '@reduxjs/toolkit';

export const threadSlice = createSlice({
  name: 'thread',
  initialState:{
    threadId:null,
    threadName:null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setThread: (state, action) =>{

        state.threadId = action.payload.threadId;
        state.threadName = action.payload.threadName
       
      } 
    
  },
 
  
});

export const { setThread } = threadSlice.actions;

export const selectThreadId = (state) => state.thread.threadId;
export const selectThreadName = (state) => state.thread.threadName;

export default threadSlice.reducer;
