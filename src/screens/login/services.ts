import configServices from 'utils/configServices';

export const fetchSendCodeToEmailInfor = async () => {
  try {
    const result = await configServices.postService('admins/send-code-login', null);
    return result;
  } catch (error) {
    throw error;
  }
};
