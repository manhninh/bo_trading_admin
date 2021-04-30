import ProLayout, {MenuDataItem, PageHeaderWrapper} from '@ant-design/pro-layout';
import {HeaderViewProps} from '@ant-design/pro-layout/lib/Header';
import vi_VN from 'antd/es/locale/vi_VN';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {routeManager} from '../routes';
import RightContent from './RightContent';

const Layout = (props: any) => {
  const {t, i18n} = useTranslation();
  const [state, setState] = useState({
    locale: vi_VN,
    userInfor: null,
  });

  useEffect(() => {
    // const userInfor = JSON.parse(localStorage.getItem(system.USER_INFO)?.toString() || '');
    // setState((state) => ({ ...state, userInfor }));
  }, []);

  const menuItemRender = (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => {
    return <Link to={menuItemProps.path || ''}>{defaultDom}</Link>;
  };

  const convertRouter = () => {
    const routers = routeManager(t);
    return routers;
  };

  const rightContentRender = (headerProps: HeaderViewProps) => <RightContent />;

  const itemRender = (route: Route, _params: any, routes: Route[], paths: string[]) =>
    routes.indexOf(route) === 0 ? (
      <Link to={`/${paths[0]}`}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );

  return (
    <ProLayout
      title="Finimix Admin"
      logo={<img src={process.env.PUBLIC_URL + '/favicon.ico'} />}
      contentWidth="Fluid"
      fixedHeader={true}
      fixSiderbar={true}
      route={convertRouter()}
      rightContentRender={rightContentRender}
      menuItemRender={menuItemRender}
      itemRender={itemRender}>
      <PageHeaderWrapper>{props.children}</PageHeaderWrapper>
    </ProLayout>
  );
};

export default Layout;
