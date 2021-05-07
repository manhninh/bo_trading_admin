import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColumnsProted} from '../model';
import {ProtectLog} from '../socketCalculator/context';
import {BaoVeSanState} from './state';
import {getProtectLogs} from './thunks';

export const initialBaoVeSanState: BaoVeSanState = {
  totalBuy: 0,
  totalSell: 0,
  protectLogs: new Array<ColumnsProted>(),
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
    addProtectLog: (state: BaoVeSanState, action: PayloadAction<ProtectLog>) => {
      const newProtectLogs = [...state.protectLogs];
      newProtectLogs.unshift(action.payload);
      if (newProtectLogs.length >= 20) newProtectLogs.pop();
      return {
        ...state,
        protectLogs: newProtectLogs,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProtectLogs.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          state.protectLogs = payload.data;
        } else throw Error('Protect logs load fail!');
      })
      .addCase(getProtectLogs.rejected, (_state, action) => {
        throw action.payload;
      });
  },
});

export const {setTotalBuy, setTotalSell, addProtectLog} = authSlice.actions;

export default authSlice.reducer;
