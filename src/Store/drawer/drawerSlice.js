
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  drawerType: null, 
  drawerData: null,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.isOpen = true;
      state.drawerType = action.payload.type;
      state.drawerData = action.payload.data;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.drawerType = null;
      state.drawerData = null;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;