import {PoweroffOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {useAppSelector} from 'boot/configureStore';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {restoreAccount, signOut} from 'routers/redux/slice';
import {fetchAdminInfor} from './services';

export type State = {
  isAuthen: boolean;
};

const RightContent = () => {
  const [state, setState] = useState<State>({
    isAuthen: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const authState = useAppSelector((state) => state.authState.userToken);

  useEffect(() => {
    if (authState && !state.isAuthen) checkAuthenToken();
    else history.push(ROUTE_PATH.LOGIN);
  }, [authState]);

  const checkAuthenToken = async () => {
    showLoading();
    try {
      const res = await fetchAdminInfor();
      if (res.data && res.data.length > 0) {
        await dispatch(restoreAccount(res.data[0]));
        setState((state) => ({...state, isAuthen: true, openSignin: false}));
      } else {
        dispatch(signOut());
        history.push(ROUTE_PATH.LOGIN);
      }
    } catch (error) {
      dispatch(signOut());
      history.push(ROUTE_PATH.LOGIN);
    } finally {
      hideLoading();
    }
  };

  const logOut = () => {
    setState((state) => ({...state, isAuthen: false}));
    dispatch(signOut());
    history.push(ROUTE_PATH.LOGIN);
  };

  return (
    <div className="right">
      <Button size="large" type="primary" icon={<PoweroffOutlined />} onClick={logOut}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default RightContent;
