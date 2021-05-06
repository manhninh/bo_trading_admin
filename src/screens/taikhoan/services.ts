import configServices from 'utils/configServices';

type SearchUser = {
  textSearch: string;
  hideAmountSmall: boolean;
  page: number;
  limit: number;
};

export const getAllUsers = async (searchUser: SearchUser) => {
  try {
    const result = await configServices.getService('admins/get-all-user', searchUser);
    return result;
  } catch (error) {
    throw error;
  }
};
