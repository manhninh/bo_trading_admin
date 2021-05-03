export type AccountInfor = {
  _id: string | null;
  email: string | null;
  isEnabledTFA: boolean;
};

export type AuthState = {
  isSignedOut: boolean;
  isSignedIn: boolean;
  userToken: string | null | undefined;
  accountInfor: AccountInfor;
};
