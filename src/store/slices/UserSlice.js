import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: null,
    userData: null,
  },
  reducers: {
    setUserRole(state, action) {
      state.role = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.role = null;
      state.userData = null;
    },
  },
});

export const { setUserRole, setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
