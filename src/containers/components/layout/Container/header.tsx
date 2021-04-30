import {PageHeader} from 'antd';
import React from 'react';
import {useHistory} from 'react-router-dom';

const TitleHeader = ({title, isBack}) => {
  const history = useHistory();
  return <PageHeader className="site-page-header" title={title} />;
};
export default TitleHeader;
