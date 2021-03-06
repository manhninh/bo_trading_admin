export enum LOCAL_STORE {
  TOKEN = '@@TOKEN',
  REFRESH_TOKEN = '@@REFRESH_TOKEN',
}

export enum RESPONSE_STATUS {
  SUCESS = 200,
  NOT_FOUND = 404,
  INTERVAL_SERVER = 500,
  FORBIDDEN = 403,
}

export const MaxAmountPlace = 9999;

export enum PlaceType {
  Add = 1,
  Subtract = 2,
  Multiply = 3,
  Devide = 4,
}

//0: Real - 1: Demo - 2: Expert - 3: User Copy
export enum TypeUser {
  REAL = 0,
  DEMO = 1,
  EXPERT = 2,
  COPY_TRADE = 3,
}

export enum TYPE_ORDER {
  BUY = 1,
  SELL = 2,
}

export enum PROTECT_STATUS {
  NORMAL = 0,
  BUY_WIN = 1,
  SELL_WIN = -1,
}

export enum SYSTEM_CONFIG {
  TRANSACTION_STATUS_PENDING = 0,
  TRANSACTION_STATUS_SUCCESS = 1,
  TRANSACTION_STATUS_CANCELLED = 2,
  TRANSACTION_STATUS_PROCESSING = 3,
}
