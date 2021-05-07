import {createAsyncThunk} from '@reduxjs/toolkit';
import configServices from 'utils/configServices';

export const getProtectLogs = createAsyncThunk('admins/get-protect-logs', async (_, thunkAPI) => {
  try {
    const result = await configServices.getService('admins/get-protect-logs');
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
