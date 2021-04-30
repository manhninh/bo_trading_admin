import {
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SwapOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {TFunction} from 'i18next';
import React from 'react';
import RouteTypes from './RouterTypes';

export const routeManager = (t: TFunction): RouteTypes => {
  return {
    routes: [
      {
        path: '/copy-trading/admin/experts',
        name: 'Dashboard',
        breadcrumbName: 'Dashboard',
        icon: <PieChartOutlined />,
      },
      {
        path: '/copy-trading/admin/users',
        name: 'Bảo vệ sàn',
        breadcrumbName: 'Bảo vệ sàn',
        icon: <SecurityScanOutlined />,
      },
      {
        path: '/copy-trading/admin/wallets',
        name: 'Quản lý tài khoản',
        breadcrumbName: 'Quản lý tài khoản',
        icon: <UsergroupAddOutlined />,
        children: [
          {
            path: '/copy-trading/admin/wallets',
            name: 'Nạp',
            breadcrumbName: 'Nạp tiền',
          },
          {
            path: '/copy-trading/admin/wallets',
            name: 'Rút',
            breadcrumbName: 'Rút tiền',
          },
        ],
      },
      {
        path: '/copy-trading/admin/users-history',
        name: 'Lịch sử chuyển tiền',
        breadcrumbName: 'Lịch sử chuyển tiền',
        icon: <SwapOutlined />,
      },
      {
        path: '/copy-trading/admin/users-history',
        name: 'Cài đặt',
        breadcrumbName: 'Cài đặt',
        icon: <SettingOutlined />,
      },
    ],
  };
};
