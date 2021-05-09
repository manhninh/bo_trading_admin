import {AuthState} from './redux/state';

export const stateConditionString = (state: AuthState) => {
  let navigateTo = '';
  if (state.isSignedIn && state.userToken) {
    navigateTo = 'GOTO_APP_SCREEN';
  }
  if (!state.isSignedIn && !state.userToken) {
    navigateTo = 'GOTO_GUEST_SCREEN';
  }
  return navigateTo;
};

export enum ROUTE_PATH {
  LOGIN = '/login',
  HOME = '/dashboard',
  BAOVESAN = '/baovesan',
  TAIKHOAN_DANHSACH = '/taikhoan/danhsach',
  NAPTIEN = '/taikhoan/naptien',
  RUTTIEN = '/taikhoan/ruttien',
  CHUYENKHOAN = '/taikhoan/chuyenkhoan',
  BAOMAT = '/caidat/baomat',
  CAUHINH = '/caidat/cauhinh',
  THONGKE_DANHSACHIB = '/thongke/ib',
  THONGKE_LICHSUGIAODICH = '/thongke/giaodichtrongngay',
}
