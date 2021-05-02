import React from 'react';
import {
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SwapOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export interface RouteTypes {
  path?: string;
  routes: {
    exact?: boolean;
    icon?: React.ReactNode;
    name?: string;
    path: string;
    children?: RouteTypes['routes'];
    hideInMenu?: boolean;
    authority?: string[] | string;
  }[];
}

export const routeManager = (): RouteTypes => ({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <PieChartOutlined />,
    },
    {
      path: '/baovesan',
      name: 'Bảo vệ sàn',
      icon: <SecurityScanOutlined />,
    },
    {
      path: '/taikhoan',
      name: 'Tài khoản',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          path: '/taikhoan/danhsach',
          name: 'Danh sách',
        },
        {
          path: '/taikhoan/naptien',
          name: 'Nạp tiền',
        },
        {
          path: '/taikhoan/ruttien',
          name: 'Rút tiền',
        },
      ],
    },
    {
      path: '/lichsuchuyentien',
      name: 'Lịch sử chuyển tiền',
      icon: <SwapOutlined />,
    },
    {
      path: '/caidat',
      name: 'Cài đặt',
      icon: <SettingOutlined />,
      children: [
        {
          path: '/caidat/baomat',
          name: 'Bảo mật',
        },
      ],
    },
  ],
});
