import configServices from 'utils/configServices';

export const getTranferUsers = async (obj: {id: string; page: number; limit: number}) => {
  try {
    const result = await configServices.getService('admins/get-tranfer-user', obj);
    return result;
  } catch (error) {
    throw error;
  }
};
