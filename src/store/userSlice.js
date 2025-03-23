import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: sessionStorage.getItem('username') || null,
    email: sessionStorage.getItem('email') || null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      sessionStorage.setItem('username', action.payload.username);
      sessionStorage.setItem('email', action.payload.email);
      sessionStorage.setItem('role', action.payload.role);

      state.user.username = sessionStorage.getItem('username') || null;
      state.user.email = sessionStorage.getItem('email') || null;
      state.user.role = sessionStorage.getItem('role') || null;
    },
    clearUser(state) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');

      state.user.username = null;
      state.user.email = null;
      state.user.role = null;
    }
  }
});

export const { setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;