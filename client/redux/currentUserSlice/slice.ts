import { createSlice } from '@reduxjs/toolkit';

interface CurrentPosts {
  text: string;
  date: Date;
}

interface CurrentUser {
  currentName: string;
  currentEmail: string;
  currentPosts: CurrentPosts[];
  currentLikedPosts: [];
}
const initialState: CurrentUser = {
  currentName: '',
  currentEmail: '',
  currentPosts: [],
  currentLikedPosts: [],
};

export const currentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUserName: (state, action) => {
      state.currentName = action.payload;
    },
    setCurrentUserEmail: (state, action) => {
      state.currentEmail = action.payload;
    },
    setCurrentUserPosts: (state, action) => {
      state.currentPosts = action.payload;
    },
    setCurrentUserLikedPosts: (state, action) => {
      state.currentLikedPosts = action.payload;
    },
  },
});

export const {
  setCurrentUserName,
  setCurrentUserEmail,
  setCurrentUserPosts,
  setCurrentUserLikedPosts,
} = currentUser.actions;
export default currentUser.reducer;
