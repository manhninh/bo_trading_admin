import React, {lazy} from 'react';
import {Route, Switch} from 'react-router';
import {ROUTE_PATH} from './helpers';
import PrivateRoute from './PrivateRoutes';

const Login = lazy(() => import('screens/login'));
const Home = lazy(() => import('screens/home'));
const BaoVeSan = lazy(() => import('screens/baovesan'));
const TaiKhoan = lazy(() => import('screens/taikhoan'));
const TaiKhoanChiTiet = lazy(() => import('screens/taikhoan/detail'));
const TaiKhoanTongNap = lazy(() => import('screens/taikhoan/detail/tongnap'));
const TaiKhoanTongRut = lazy(() => import('screens/taikhoan/detail/tongrut'));
const TaiKhoanHoaHong = lazy(() => import('screens/taikhoan/detail/hoahong'));
const TaiKhoanLichSuGiaoDich = lazy(() => import('screens/taikhoan/detail/lichsutrade'));
const TaiKhoanChuyenKhoan = lazy(() => import('screens/taikhoan/detail/chuyenkhoan'));
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
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_CHITIET} comp={TaiKhoanChiTiet} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_TONGNAP} comp={TaiKhoanTongNap} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_TONGRUT} comp={TaiKhoanTongRut} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_HOAHONG} comp={TaiKhoanHoaHong} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_LICHSUGIAODICH} comp={TaiKhoanLichSuGiaoDich} />
      <PrivateRoute path={ROUTE_PATH.TAIKHOAN_CHUYENKHOAN} comp={TaiKhoanChuyenKhoan} />
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
