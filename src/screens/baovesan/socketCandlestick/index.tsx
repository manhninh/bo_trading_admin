import config from 'constants/config';
import {LOCAL_STORE} from 'constants/system';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import SocketContext from './context';
import {candlestickEvents, candlestickSocketDisconnect} from './events';

const SocketProvider = (props: any) => {
  const dispatch = useDispatch();
  const socketCandlestickRef = useRef<Socket | null>(null);

  const [value, setValue] = useState({
    timeTick: 0,
  });

  // scoket nến
  useEffect(() => {
    if (!socketCandlestickRef.current) {
      socketCandlestickRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '', {
        query: {
          token: localStorage.getItem(LOCAL_STORE.TOKEN)?.toString().split(' ')[1] || '',
        },
      });
      candlestickEvents({
        setValue,
        socketCandlestick: socketCandlestickRef?.current,
        dispatch,
      });
    }
    return () => {
      candlestickSocketDisconnect(socketCandlestickRef?.current);
    };
  }, [candlestickEvents]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};

export default React.memo(SocketProvider);
