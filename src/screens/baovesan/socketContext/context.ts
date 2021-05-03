import {createContext} from 'react';

export type Order = {
  userId: string;
  username: string;
  typeUser: number;
  typeOrder: number;
  amount_order: number;
};

export type ContextType = {
  orders_buy: Order[];
  orders_sell: Order[];
};

const SocketContext = createContext<ContextType>({
  orders_buy: new Array<Order>(),
  orders_sell: new Array<Order>(),
});

export default SocketContext;
