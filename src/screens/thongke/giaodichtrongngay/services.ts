import configServices from 'utils/configServices';

export const getTransactionInDay = async () => {
  try {
    const result = await configServices.getService('admins/report-transaction-day', {date: new Date()});
    return result;
  } catch (error) {
    throw error;
  }
};
