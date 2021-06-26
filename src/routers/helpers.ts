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
  TAIKHOAN_CHITIET = '/taikhoan/chitiet/:id',
  TAIKHOAN_TONGNAP = '/tongnap/:username',
  TAIKHOAN_TONGRUT = '/tongrut/:username',
  TAIKHOAN_HOAHONG = '/hoahong/:id',
  TAIKHOAN_LICHSUGIAODICH = '/lichsutrade/:id',
  TAIKHOAN_CHUYENKHOAN = '/tranfers/:id',
  NAPTIEN = '/taikhoan/naptien',
  RUTTIEN = '/taikhoan/ruttien',
  CHUYENKHOAN = '/taikhoan/chuyenkhoan',
  BAOMAT = '/caidat/baomat',
  CAUHINH = '/caidat/cauhinh',
  THONGKE_DANHSACHIB = '/thongke/ib',
  THONGKE_LICHSUGIAODICH = '/thongke/giaodichtrongngay',
}
