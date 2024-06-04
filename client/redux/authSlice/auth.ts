import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface authTypes {
  name: string;
  email: string;
  password: string;
}
const initialState: authTypes = {
  name: '',
  email: '',
  password: '',
};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setUserName, setUserEmail, setUserPassword } = authSlice.actions;
export default authSlice.reducer;
