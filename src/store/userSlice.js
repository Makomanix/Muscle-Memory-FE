import { createSlice } from "@reduxjs/toolkit";
import { getStorageUser } from "../util/sessionStorage";

const storageUser = getStorageUser();

const initialState = {
  user: {
    userId: storageUser?.userId || null,
    username: storageUser?.username || null,
    email: storageUser?.email || null,
    role: storageUser?.role || null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload.username);
      state.user.userId = action.payload.userId;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.role = action.payload.role;
    },
    clearUser(state) {
      console.log('in slice')
      state.user.userId = null;
      state.user.username = null;
      state.user.email = null;
      state.user.role = null;
    }
  }
});

export const { setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;