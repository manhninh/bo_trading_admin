import React from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {ROUTE_PATH} from 'routers/helpers';
import './styled.css';

const SidebarLayout = () => {
  const {t} = useTranslation();
  return (
    <nav id="sidebar" className="shrinked">
      <ul className="list-unstyled">
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-trading"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-copy_trade"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-wallet"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-history"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-affiliate_link"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-commission"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.HOME}>
            <i className="icomoon-icon-settings"></i>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(SidebarLayout);
