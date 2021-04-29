import {
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SwapOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, {useState} from 'react';
import {Props} from './propState';
import './styled.css';

const ContainerLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/favicon.ico'} />
        </div>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="protect_trading" icon={<SecurityScanOutlined />}>
            Protect trading
          </Menu.Item>
          <Menu.Item key="user" icon={<UsergroupAddOutlined />}>
            User
          </Menu.Item>
          <SubMenu key="wallet" icon={<WalletOutlined />} title="Wallet">
            <Menu.Item key="deposit">Deposit</Menu.Item>
            <Menu.Item key="withraw">Withdraw</Menu.Item>
          </SubMenu>
          <Menu.Item key="user" icon={<SwapOutlined />}>
            Tranfer History
          </Menu.Item>
          <Menu.Item key="user" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(ContainerLayout);
