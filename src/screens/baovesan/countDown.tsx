import {Progress} from 'antd';
import Title from 'antd/lib/typography/Title';
import React, {useContext} from 'react';
import SocketContext, {ContextType} from './socketCandlestick/context';

const CountDownComponent = () => {
  const {timeTick} = useContext<ContextType>(SocketContext);

  return (
    <Progress
      type="circle"
      percent={100}
      strokeColor={timeTick <= 30 ? '#16ceb9' : '#f04b4b'}
      format={() => (
        <Title className="mb-0" level={1}>
          {30 - (timeTick % 30)}
        </Title>
      )}
    />
  );
};

export default React.memo(CountDownComponent);
