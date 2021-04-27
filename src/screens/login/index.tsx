import {Button, Form, Input} from 'antd';
import useError from 'containers/hooks/errorProvider/useError';
import {Rule, Store} from 'rc-field-form/lib/interface';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {fetchLogin} from 'routers/redux/thunks';
import './styled.css';

interface IFormInputs {
  username: string;
  password: string;
  isTfa: boolean;
  tfa: string;
}

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
    username: [{required: true, message: 'Please input your username!'}],
    password: [{required: true, message: 'Please input your password!'}],
  };

  return (
    <div className="main">
      <Form.Item>
        <img src={process.env.PUBLIC_URL + '/logo512.png'} style={{textAlign: 'center'}} />
      </Form.Item>
      <Form name="basic" layout="vertical" initialValues={{remember: false}} onFinish={onFinish}>
        <Form.Item label="Username" name="username" rules={validation.username}>
          <Input autoComplete="off" autoFocus={true} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={validation.password}>
          <Input.Password autoComplete="off" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(LogInComponent);
