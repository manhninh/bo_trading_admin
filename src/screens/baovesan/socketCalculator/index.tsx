import config from 'constants/config';
import {LOCAL_STORE} from 'constants/system';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import SocketContext, {Order} from './context';
import {calculatorEvents, calculatorSocketDisconnect} from './events';

const SocketProvider = (props: any) => {
  const dispatch = useDispatch();
  const socketCalculatorRef = useRef<Socket | null>(null);

  const [value, setValue] = useState({
    orders_buy: new Array<Order>(),
    orders_sell: new Array<Order>(),
  });

  //socket calculator
  useEffect(() => {
    if (!socketCalculatorRef.current) {
      socketCalculatorRef.current = socketIOClient(config.WS_CALCULATOR?.toString() || '', {
        query: {
          token: localStorage.getItem(LOCAL_STORE.TOKEN)?.toString().split(' ')[1] || '',
        },
      });
      calculatorEvents({
        setValue,
        socketCalculator: socketCalculatorRef?.current,
        dispatch,
      });
    }
    return () => {
      calculatorSocketDisconnect(socketCalculatorRef?.current);
    };
  }, [calculatorEvents]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};

export default React.memo(SocketProvider);
