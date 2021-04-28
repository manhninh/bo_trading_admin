import {Button, Form, Input} from 'antd';
import Search from 'antd/lib/input/Search';
import useError from 'containers/hooks/errorProvider/useError';
import {Rule, Store} from 'rc-field-form/lib/interface';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {fetchLogin} from 'routers/redux/thunks';
import './styled.less';

const LogInComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {addError} = useError();

  const onFinish = async (values: Store) => {
    setLoading(true);
    try {
      await dispatch(fetchLogin({username: values.username, password: values.password, tfa: values.tfa}));
      history.push(ROUTE_PATH.HOME);
    } catch (err) {
      addError(err, 'Login fail');
    } finally {
      setLoading(false);
    }
  };

  const validation: {[key: string]: Rule[]} = {
    username: [{required: true, message: 'Please input email code verify!'}],
    tfa: [{required: true, message: 'Please input 2FA!'}],
  };

  const _sendCode = () => {};

  return (
    <div className="main">
      <Form.Item>
        <img src={process.env.PUBLIC_URL + '/logo512.png'} style={{textAlign: 'center'}} />
      </Form.Item>
      <Form name="basic" layout="vertical" initialValues={{remember: false}} onFinish={onFinish}>
        <Form.Item label="Email Code" name="username" rules={validation.username}>
          <Search allowClear={true} enterButton="Send" onSearch={_sendCode} />
        </Form.Item>
        <Form.Item label="2FA" name="tfa" rules={validation.tfa}>
          <Input autoComplete="off" maxLength={6} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(LogInComponent);
