import configServices from 'utils/configServices';

type SearchUser = {
  username: string;
  status: number;
  fromDate: Date;
  toDate: Date;
  page: number;
  limit: number;
};

export const getWithdrawUsers = async (searchUser: SearchUser) => {
  try {
    const result = await configServices.getService('admins/get-all-withdraw', searchUser);
    return result;
  } catch (error) {
    throw error;
  }
};

export const withdrawConfirm = async (transactionId: string) => {
  try {
    const result = await configServices.postService('admins/withdraw/confirm', {transactionId});
    return result;
  } catch (error) {
    throw error;
  }
};

export const withdrawReject = async (transactionId: string) => {
  try {
    const result = await configServices.postService('admins/withdraw/reject', {transactionId});
    return result;
  } catch (error) {
    throw error;
  }
};

export const autoWithdraw = async (key: string, value: string) => {
  try {
    const result = await configServices.postService('admins/config/system', {key, value});
    return result;
  } catch (error) {
    throw error;
  }
};
