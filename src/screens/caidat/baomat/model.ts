export interface IFormConfirmMFA {
  password: string;
  code: string;
  secret?: string | null;
  disabled: boolean;
}
