import {Button, Form, FormInstance, Input, message} from 'antd';
import Search from 'antd/lib/input/Search';
import useError from 'containers/hooks/errorProvider/useError';
import {Rule, Store} from 'rc-field-form/lib/interface';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {fetchLogin} from 'routers/redux/thunks';
import {fetchSendCodeToEmailInfor} from './services';
import './styled.less';

const LogInComponent = () => {
  const formRef = React.createRef<FormInstance>();
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
    username: [{required: true, message: 'Nhập email!'}],
    password: [{required: true, message: 'Nhập code gửi đến email!'}],
    tfa: [{required: true, message: 'Nhập code 2FA!'}],
  };

  const _sendCode = () => {
    setLoading(true);
    try {
      const email = formRef.current?.getFieldValue('username');
      fetchSendCodeToEmailInfor(email);
      message.success('Kiểm tra email của bạn');
    } catch (error) {
      addError(error, 'Gửi mã đến email thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <Form ref={formRef} name="basic" layout="vertical" initialValues={{remember: false}} onFinish={onFinish}>
        <Form.Item label="Email" name="username" rules={validation.username}>
          <Search autoFocus={true} allowClear={true} enterButton="Send" loading={loading} onSearch={_sendCode} />
        </Form.Item>
        <Form.Item label="Verify Code" name="password" rules={validation.password}>
          <Input autoComplete="off" allowClear={true} />
        </Form.Item>
        <Form.Item label="2FA" name="tfa" rules={validation.tfa}>
          <Input autoComplete="off" allowClear={true} maxLength={6} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(LogInComponent);
