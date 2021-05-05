import ProLayout, {MenuDataItem, PageHeaderWrapper} from '@ant-design/pro-layout';
import {HeaderViewProps} from '@ant-design/pro-layout/lib/Header';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';
import React from 'react';
import {Link} from 'react-router-dom';
import {routeManager} from 'routers/config';
import RightContent from './RightContent';

const Layout = (props: any) => {
  const menuItemRender = (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => {
    return <Link to={menuItemProps.path || ''}>{defaultDom}</Link>;
  };

  const convertRouter = () => {
    const routers = routeManager();
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
      logo={<img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="..." />}
      contentWidth="Fixed"
      fixedHeader={true}
      layout="mix"
      navTheme="dark"
      headerHeight={60}
      fixSiderbar={true}
      route={convertRouter()}
      rightContentRender={rightContentRender}
      menuItemRender={menuItemRender}
      itemRender={itemRender}
      breadcrumbRender={false}>
      <PageHeaderWrapper fixedHeader={true}>{props.children}</PageHeaderWrapper>
    </ProLayout>
  );
};

export default Layout;
