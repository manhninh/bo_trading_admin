import configServices from 'utils/configServices';
import {IFormConfirmMFA} from './model';

export const fetchCreateMFAInfor = async () => {
  try {
    const result = await configServices.postService('admins/create-mfa', null);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchSendCodeToEmailInfor = async () => {
  try {
    const result = await configServices.postService('admins/send-code-verify', null);
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyOTPToken = async (data: IFormConfirmMFA) => {
  try {
    const result = await configServices.postService('admins/verify_otp', data);
    return result;
  } catch (error) {
    throw error;
  }
};
