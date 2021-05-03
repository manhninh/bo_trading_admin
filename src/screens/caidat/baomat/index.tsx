import {useAppSelector} from 'boot/configureStore';
import ContainerLayout from 'containers/components/layout';
import React from 'react';
import Bat2FAComponent from './Bat2FA';
import Tat2FAComponent from './Tat2FA';

const BaoMatComponent = () => {
  const isEnabledTFA = useAppSelector((state) => state.authState.accountInfor.isEnabledTFA);

  return <ContainerLayout>{!isEnabledTFA ? <Bat2FAComponent /> : <Tat2FAComponent />}</ContainerLayout>;
};

export default React.memo(BaoMatComponent);
