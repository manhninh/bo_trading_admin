import {message, Radio, RadioChangeEvent} from 'antd';
import {PROTECT_STATUS} from 'constants/system';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useContext, useEffect, useState} from 'react';
import CountDownComponent from './countDown';
import {postChangeProtectStatus} from './services';
import SocketContext, {ContextType} from './socketCandlestick/context';

const ThuCongComponent = () => {
  const {hideLoading, showLoading} = useLoading();
  const {timeTick} = useContext<ContextType>(SocketContext);
  const [protectStatus, setProtectStatus] = useState(PROTECT_STATUS.NORMAL);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(timeTick, 'timeTick');
    if (timeTick >= 30 && timeTick < 50) setDisabled(false);
    else setDisabled(true);
  }, [timeTick]);

  const _changeProtectStatus = async (e: RadioChangeEvent) => {
    showLoading();
    try {
      const result = await postChangeProtectStatus(e.target.value);
      if (result.data) setProtectStatus(e.target.value);
      else message.error('Kích hoạt bảo vệ sàn thất bại!');
    } catch (error) {
      message.error('Kích hoạt bảo vệ sàn thất bại!');
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className="text-center mb-1">
        <Radio.Group value={protectStatus} buttonStyle="solid" onChange={_changeProtectStatus} disabled={disabled}>
          <Radio.Button value={PROTECT_STATUS.BUY_WIN}>Mua thắng</Radio.Button>
          <Radio.Button value={PROTECT_STATUS.SELL_WIN}>Bán thắng</Radio.Button>
          <Radio.Button value={PROTECT_STATUS.NORMAL}>Tự động</Radio.Button>
        </Radio.Group>
      </div>
      <div className="text-center">
        <CountDownComponent />
      </div>
    </>
  );
};

export default React.memo(ThuCongComponent);
