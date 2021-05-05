import {PROTECT_STATUS} from 'constants/system';
import configServices from 'utils/configServices';

export const postChangeProtectStatus = async (protectStatus: PROTECT_STATUS) => {
  try {
    const result = await configServices.postService('admins/activate-protection', {
      protectStatus,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProtectLogs = async () => {
  try {
    const result = await configServices.getService('admins/get-protect-logs');
    return result;
  } catch (error) {
    throw error;
  }
};
