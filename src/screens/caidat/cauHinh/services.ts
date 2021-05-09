import configServices from 'utils/configServices';

export const getProtectDetails = async () => {
  try {
    const result = await configServices.getService('admins/get-protect-details');
    return result;
  } catch (error) {
    throw error;
  }
};

export const saveProtectDetails = async (protectLevel1:number,protectLevel2:number,protectLevel3:number) => {
  try {
    const result = await configServices.postService('admins/save_protect', {
      protectLevel1,
      protectLevel2,
      protectLevel3
    });
    return result;
  } catch (error) {
    throw error;
  }
};
