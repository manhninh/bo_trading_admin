import configServices from 'utils/configServices';

export const fetchSendCodeToEmailInfor = async (email:string) => {
  try {
    const result = await configServices.postService('admins/send-code-login', {email});
    return result;
  } catch (error) {
    throw error;
  }
};
