import configServices from 'utils/configServices';

export const fetchAdminInfor = async () => {
  try {
    const result = await configServices.getService('admins');
    return result;
  } catch (error) {
    throw error;
  }
};
