import {createContext} from 'react';

export type ContextType = {
  timeTick: number;
};

const SocketContext = createContext<ContextType>({
  timeTick: 0,
});

export default SocketContext;
