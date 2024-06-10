import { createSlice } from '@reduxjs/toolkit';

export type Item = {
  id: string;
  email: string;
  text: string;
  name: string;
  avatar: string | null;
  date: string;
  likes: number;
};

type Tweet = {
  tweetInfo: Item[] | any;
  isEditVisible: boolean;
};

const initialState: Tweet = {
  tweetInfo: [],
  isEditVisible: false,
};

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setTweetInfo: (state, action) => {
      state.tweetInfo = action.payload;
    },
    setIsEditVisible: (state, action) => {
      state.isEditVisible = action.payload;
    },
  },
});

export const { setTweetInfo, setIsEditVisible } = tweetSlice.actions;
export default tweetSlice.reducer;
