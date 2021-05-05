import {createContext} from 'react';

export type Order = {
  userId: string;
  username: string;
  typeUser: number;
  typeOrder: number;
  amount_order: number;
};

export type ProtectLog = {
  type: number;
  diff: number;
  level: number;
  createdAt: Date;
};

export type ContextType = {
  orders_buy: Order[];
  orders_sell: Order[];
  protectLog: ProtectLog | null;
};

const SocketContext = createContext<ContextType>({
  orders_buy: new Array<Order>(),
  orders_sell: new Array<Order>(),
  protectLog: null,
});

export default SocketContext;
