import {Spin} from 'antd';
import React from 'react';
import './styled.css';

const SpinnerLoader = () => (
  <div className="fallbackContainer">
    <div className="fallbackContent">
      <Spin size="large" />
    </div>
  </div>
);

export default React.memo(SpinnerLoader);
