import {PoweroffOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React from 'react';
import {useHistory} from 'react-router-dom';

const RightContent = () => {
  const history = useHistory();
  return (
    <div className="right">
      <Button type="primary" icon={<PoweroffOutlined />} />
    </div>
  );
};

export default RightContent;
