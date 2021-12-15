import { configureStore } from '@reduxjs/toolkit';

import remoteSlice from './remoteSlice';

export default configureStore({
  reducer: {
    remote: remoteSlice,
  },
});
