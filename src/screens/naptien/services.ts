import configServices from 'utils/configServices';

type SearchUser = {
  username: string;
  status: number;
  fromDate: Date;
  toDate: Date;
  page: number;
  limit: number;
};

export const getDepositUsers = async (searchUser: SearchUser) => {
  try {
    const result = await configServices.getService('admins/get-all-deposit', searchUser);
    return result;
  } catch (error) {
    throw error;
  }
};
