import {message as MessageAnt} from 'antd';
import {LOCAL_STORE, RESPONSE_STATUS} from 'constants/system';
import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {Props} from './propState';
import {ErrorContext} from './useError';

export default function ErrorProvider({children}: Props) {
  const history = useHistory();

  const addError = async (err: Response | null, message: null) => {
    if (err) {
      if (err.status === RESPONSE_STATUS.NOT_FOUND) {
        MessageAnt.error('There is a problem with the server, please contact the administrator');
        return;
      }

      if (err.status === RESPONSE_STATUS.FORBIDDEN) {
        localStorage.removeItem(LOCAL_STORE.TOKEN);
        history.push('/');
        return;
      }

      if (err.status === RESPONSE_STATUS.INTERVAL_SERVER) {
        const error = await err.json();
        MessageAnt.error(error.error_description || message || '');
        return;
      }
    } else MessageAnt.error(message);
  };

  const contextValue = {
    addError: useCallback((err, message) => addError(err, message), []),
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
}
