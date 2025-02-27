import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem('token') || null
}

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      sessionStorage.setItem('token', action.payload)
      state.token = sessionStorage.getItem('token') || null      
    },
    clearToken(state) {
      sessionStorage.removeItem('token')
      state.token = null
    },
  }
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;