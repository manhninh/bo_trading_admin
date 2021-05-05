import React, {lazy} from 'react';
import {Route, Switch} from 'react-router';
import {ROUTE_PATH} from './helpers';
import PrivateRoute from './PrivateRoutes';

const Login = lazy(() => import('screens/login'));
const Home = lazy(() => import('screens/home'));
const BaoVeSan = lazy(() => import('screens/baovesan'));
const TaiKhoan = lazy(() => import('screens/taikhoan'));
const NapTien = lazy(() => import('screens/naptien'));
const RutTien = lazy(() => import('screens/ruttien'));
const BaoMat = lazy(() => import('screens/caidat/baomat'));
const ThietLapBvsTuDong = lazy(() => import('screens/caidat/baovesan'));
const NotFound = lazy(() => import('containers/components/exceptions/404'));

const NavigationComponent = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path={ROUTE_PATH.LOGIN} component={Login} />
      <PrivateRoute path={ROUTE_PATH.HOME} comp={Home} />
      <PrivateRoute path={ROUTE_PATH.BAOVESAN} comp={BaoVeSan} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_DANHSACH} comp={TaiKhoan} />
      <PrivateRoute path={ROUTE_PATH.NAPTIEN} comp={NapTien} />
      <PrivateRoute path={ROUTE_PATH.RUTTIEN} comp={RutTien} />
      <PrivateRoute path={ROUTE_PATH.BAOMAT} comp={BaoMat} />
      <PrivateRoute path={ROUTE_PATH.THIETLAP_BVS_TUDONG} comp={ThietLapBvsTuDong} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(NavigationComponent);
