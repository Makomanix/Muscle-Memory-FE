import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: sessionStorage.getItem('username') || null,
    email: sessionStorage.getItem('email') || null,
    password: null,
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      sessionStorage.setItem('username', action.payload.username)
      sessionStorage.setItem('email', action.payload.email)

      state.user.username = sessionStorage.getItem('username') || null
      state.user.email = sessionStorage.getItem('email') || null
      state.user.password = action.payload.password
    },
    clearUser(state) {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('email')

      state.user.username = null
      state.user.email = null
      state.user.password = null
    }
  }
});

export const { setUser, clearUser} = userSlice.actions
export default userSlice.reducer