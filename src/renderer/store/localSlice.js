import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'local',
  initialState: {
    isDrawerOpen: false,
    wallpaperId: '',
  },
  reducers: {
    openDrawer: (state, action) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state, action) => {
      state.isDrawerOpen = false;
      state.wallpaperId = '';
    },
    setWallpaperId: (state, action) => {
      state.wallpaperId = action.payload;
    },
  },
});

export const { openDrawer, closeDrawer, setWallpaperId } = slice.actions;

export const selectIsDrawerOpen = (state) => state.local.isDrawerOpen;
export const selectWallpaperId = (state) => state.local.wallpaperId;

export default slice.reducer;
