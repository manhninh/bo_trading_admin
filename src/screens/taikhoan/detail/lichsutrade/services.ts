import configServices from 'utils/configServices';

export const getTradeHistory = async (id: string, page: string, limit: number, type: string) => {
  try {
    const result = await configServices.getService('admins/histories-trade-user', {id, type, page, limit});
    return result;
  } catch (error) {
    throw error;
  }
};
