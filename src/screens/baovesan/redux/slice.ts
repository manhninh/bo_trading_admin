import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaoVeSanState} from './state';

export const initialBaoVeSanState: BaoVeSanState = {
  totalBuy: 0,
  totalSell: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialBaoVeSanState,
  reducers: {
    setTotalBuy: (state: BaoVeSanState, action: PayloadAction<number>) => ({
      ...state,
      totalBuy: action.payload,
    }),
    setTotalSell: (state: BaoVeSanState, action: PayloadAction<number>) => ({
      ...state,
      totalSell: action.payload,
    }),
  },
});

export const {setTotalBuy, setTotalSell} = authSlice.actions;

export default authSlice.reducer;
