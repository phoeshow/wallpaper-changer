import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const TAG_NAME_LIST = [
  'anime girls',
  'anime',
  'digital art',
  'WLOP',
  'Overwatch',
];

export const slice = createSlice({
  name: 'remote',
  initialState: {
    tagNameList: TAG_NAME_LIST,
    currentTag: TAG_NAME_LIST[0],
    currentPage: 1,
  },
  reducers: {
    chooseTag: (state, action) => {
      state.currentTag = action.payload;
      state.currentPage = 1;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { chooseTag, changePage } = slice.actions;

export const selectCurrentTag = (state) => state.remote.currentTag;
export const selectCurrentPage = (state) => state.remote.currentPage;

export default slice.reducer;
