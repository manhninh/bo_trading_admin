import React, {lazy} from 'react';
import {Route, Switch} from 'react-router';
import {ROUTE_PATH} from './helpers';
import PrivateRoute from './PrivateRoutes';

const Login = lazy(() => import('screens/login'));
const Home = lazy(() => import('screens/home'));
const NotFound = lazy(() => import('containers/components/exceptions/404'));

const NavigationComponent = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path={ROUTE_PATH.LOGIN} component={Login} />
      <PrivateRoute path={ROUTE_PATH.HOME} comp={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(NavigationComponent);
