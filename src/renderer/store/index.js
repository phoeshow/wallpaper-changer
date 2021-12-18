import { configureStore } from '@reduxjs/toolkit';

import remoteSlice from './remoteSlice';
import localSlice from './localSlice';

export default configureStore({
  reducer: {
    remote: remoteSlice,
    local: localSlice,
  },
});
