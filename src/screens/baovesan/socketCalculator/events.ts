import {signOut} from 'routers/redux/slice';
import {Socket} from 'socket.io-client';
import {ContextType, ProtectLog} from './context';
import {EVENTS, ROOM} from './socketConfig';

export const calculatorEvents = ({setValue, socketCalculator, dispatch}) => {
  if (!socketCalculator) return;

  socketCalculator.on('connect', () => {
    /** tạo zoom với user_id để nhận socket emit */
    socketCalculator.emit(ROOM.USER_CONNECTED);
  });

  /** khi gặp lỗi với socket tính toán sẽ đẩy ra trang home */
  socketCalculator.on('connect_error', () => {
    dispatch(signOut());
  });

  /** order của người dùng */
  socketCalculator.on(EVENTS.ORDER_SELL_QUEUE, (result: any) => {
    setValue((state: ContextType) => ({...state, orders_sell: result}));
  });

  socketCalculator.on(EVENTS.ORDER_BUY_QUEUE, (result: any) => {
    setValue((state: ContextType) => ({...state, orders_buy: result}));
  });
};

export const calculatorSocketDisconnect = (socketCalculator: Socket | null) => {
  if (!socketCalculator) return;
  socketCalculator.off(EVENTS.ORDER_SELL_QUEUE);
  socketCalculator.off(EVENTS.ORDER_BUY_QUEUE);
  socketCalculator.disconnect();
};
