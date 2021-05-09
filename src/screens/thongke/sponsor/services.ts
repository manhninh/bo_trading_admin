import configServices from 'utils/configServices';

type SearchUser = {
  username: string;
  page: number;
  limit: number;
};

export const getSponsorUsers = async (searchUser: SearchUser) => {
  try {
    const result = await configServices.getService('admins/get-all-sponsor', searchUser);
    return result;
  } catch (error) {
    throw error;
  }
};
