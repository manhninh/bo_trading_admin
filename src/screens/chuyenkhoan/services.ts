import configServices from 'utils/configServices';

type SearchUser = {
  username: string;
  status: number;
  fromDate: Date;
  toDate: Date;
  page: number;
  limit: number;
};

export const getTranferUsers = async (searchUser: SearchUser) => {
  try {
    const result = await configServices.getService('admins/get-all-tranfers', searchUser);
    return result;
  } catch (error) {
    throw error;
  }
};
