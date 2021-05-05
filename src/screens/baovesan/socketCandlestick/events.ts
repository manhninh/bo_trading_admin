import {Socket} from 'socket.io-client';
import {ContextType} from './context';
import {EVENTS, ROOM} from './socketConfig';

export const candlestickEvents = ({setValue, socketCandlestick, dispatch}) => {
  if (!socketCandlestick) return;

  socketCandlestick.on('connect', () => {
    /** join room ethusdt */
    socketCandlestick.emit(ROOM.ETHUSDT);
  });
  /** dữ liệu nến trả về từng giây */
  socketCandlestick.on(EVENTS.ETHUSDT_REALTIME, (result: any) => {
    setValue((state: ContextType) => ({...state, timeTick: result.timeTick}));
  });
};

export const candlestickSocketDisconnect = (socketCandlestick: Socket | null) => {
  if (!socketCandlestick) return;
  socketCandlestick.off(EVENTS.ETHUSDT_REALTIME);
  socketCandlestick.disconnect();
};
