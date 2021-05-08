import {useAppSelector} from 'boot/configureStore';
import LoaderPage from 'containers/components/loader';
import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import {ConfigProvider} from 'antd';

const PrivateRoute = ({comp: Component, ...rest}: any) => {
  const [accepted, setAccepted] = useState(true);
  const authState = useAppSelector((state) => state.authState);

  useEffect(() => {
    if (authState.userToken) setAccepted(true);
  }, [authState]);

  return accepted ? (
    <Route
      {...rest}
      render={(props) => (
        <ConfigProvider locale={locale}>
          <Component {...props} />
        </ConfigProvider>
      )}
    />
  ) : (
    <LoaderPage />
  );
};
export default PrivateRoute;
