import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LOCAL_STORE} from 'constants/system';
import {AccountInfor, AuthState} from './state';
import {fetchLogin} from './thunks';

export const initialAuthState: AuthState = {
  isSignedOut: false,
  isSignedIn: false,
  userToken: null,
  accountInfor: {
    _id: null,
    email: null,
    isEnabledTFA: false,
    config: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    toSignInPage: (state: AuthState) => ({
      ...state,
      isSignedIn: false,
      userToken: null,
      accountInfor: {
        _id: null,
        email: null,
        isEnabledTFA: false,
        config: [],
      },
    }),
    signIn: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      isSignedOut: false,
      isSignedIn: true,
      userToken: action.payload,
    }),
    signOut: (state: AuthState) => ({
      ...state,
      isSignedOut: true,
    }),
    restoreAccount: (state: AuthState, action: PayloadAction<AccountInfor>) => ({
      ...state,
      accountInfor: {...state.accountInfor, ...action.payload},
    }),
    changeStatusTFA: (state: AuthState, action: PayloadAction<boolean>) => ({
      ...state,
      accountInfor: {...state.accountInfor, isEnabledTFA: action.payload},
    }),
    updateAvatar: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      accountInfor: {...state.accountInfor, avatar: action.payload},
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          state.isSignedOut = false;
          state.isSignedIn = true;
          state.userToken = `${action.payload.token_type} ${action.payload.access_token}`;
          localStorage.setItem(LOCAL_STORE.TOKEN, `${action.payload.token_type} ${action.payload.access_token}`);
        } else throw Error('Login fail!');
      })
      .addCase(fetchLogin.rejected, (_state, action) => {
        throw action.payload;
      });
  },
});

export const {toSignInPage, restoreAccount, signIn, signOut, changeStatusTFA, updateAvatar} = authSlice.actions;

export default authSlice.reducer;
