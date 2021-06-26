import configServices from 'utils/configServices';

export const getCommissionsTradeDetail = async (
  id: string,
  fromDate: Date,
  toDate: Date,
  page: number,
  limit: number,
) => {
  try {
    const result = await configServices.getService('admins/commission-detail-user', {id, fromDate, toDate, page, limit});
    return result;
  } catch (error) {
    throw error;
  }
};
