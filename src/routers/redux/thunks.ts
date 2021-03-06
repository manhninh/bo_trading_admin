import {createAsyncThunk} from '@reduxjs/toolkit';
import config from 'constants/config';
import configServices from 'utils/configServices';

type Auth = {
  username: string;
  password: string;
  tfa: string | null;
};

export const fetchLogin = createAsyncThunk('auth/login', async (auth: Auth, thunkAPI) => {
  try {
    const result = await configServices.postService('oauth/token', {
      username: auth.username,
      password: auth.password,
      grant_type: 'password',
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      scope: config.SCOPE,
      tfa: auth.tfa,
      admin: true,
    });
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});