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
const ChuyenKhoan = lazy(() => import('screens/chuyenkhoan'));
const BaoMat = lazy(() => import('screens/caidat/baomat'));
const CauHinh = lazy(() => import('screens/caidat/cauHinh'));
const GiaoDichTrongNgay = lazy(() => import('screens/thongke/giaodichtrongngay'));
const Sponsor = lazy(() => import('screens/thongke/sponsor'));
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
      <PrivateRoute path={ROUTE_PATH.CHUYENKHOAN} comp={ChuyenKhoan} />
      <PrivateRoute path={ROUTE_PATH.BAOMAT} comp={BaoMat} />
      <PrivateRoute path={ROUTE_PATH.CAUHINH} comp={CauHinh} />
      <PrivateRoute path={ROUTE_PATH.THONGKE_DANHSACHIB} comp={Sponsor} />
      <PrivateRoute path={ROUTE_PATH.THONGKE_LICHSUGIAODICH} comp={GiaoDichTrongNgay} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(NavigationComponent);
