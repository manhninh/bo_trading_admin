import {Button, Card, Col, Form, Input, message, Row} from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import QRCode from 'qrcode.react';
import {Rule, Store} from 'rc-field-form/lib/interface';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeStatusTFA} from 'routers/redux/slice';
import {fetchCreateMFAInfor, fetchSendCodeToEmailInfor, verifyOTPToken} from './services';

const Bat2FAComponent = () => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    qrCode: '',
    secret: '',
  });

  useEffect(() => {
    createMFA();
  }, []);

  const createMFA = async () => {
    showLoading();
    try {
      const res = await fetchCreateMFAInfor();
      if (res.data) {
        setState({
          qrCode: res.data.url,
          secret: res.data.secret,
        });
      }
    } catch (error) {
      addError(error, 'Tạo mã 2FA thất bại!');
    } finally {
      hideLoading();
    }
  };

  const _sendCode = async () => {
    setLoading(true);
    try {
      await fetchSendCodeToEmailInfor();
      message.success('Kiểm tra email của bạn');
    } catch (error) {
      addError(error, 'Gửi mã đến email thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: Store) => {
    setLoading(true);
    try {
      const result = await verifyOTPToken({
        password: values.code,
        code: values.tfa,
        secret: state.secret,
        disabled: true,
      });
      if (result) dispatch(changeStatusTFA(true));
      else message.error('Bật 2FA thất bại!');
    } catch (err) {
      addError(err, 'Bật 2FA thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const validation: {[key: string]: Rule[]} = {
    code: [{required: true, message: 'Nhập code gửi đến email!'}],
    tfa: [{required: true, message: 'Nhập code 2FA!'}],
  };

  return (
    <Card title="Cài đặt 2FA">
      <Row gutter={16}>
        <Col className="gutter-row mb-1-5" sm={8} xs={24}>
          <Title level={3} type="danger">
            Step 1
          </Title>
          <span>
            <strong>Tải ứng dụng Authenticator</strong> tới điện thoại hay máy tính bảng có camera của bạn. Chúng tôi
            khuyên bạn nên sử dụng một trong các ứng dụng miễn phí hiện có từ PlayStore hoặc AppStore:
          </span>
          <br />
          <br />
          <strong>Google Authenticator</strong>
          <br />
          <img src={`${process.env.PUBLIC_URL}/img/google-authenticator.png`} alt="..." className="w-60" />
          <br />
          <br />
          <strong>Authy 2-Factor Authentication</strong>
          <br />
          <img src={`${process.env.PUBLIC_URL}/img/authy.png`} alt="..." className="w-60" />
        </Col>
        <Col className="gutter-row" sm={8} xs={24}>
          <Title level={3} type="danger">
            Step 2
          </Title>
          <span>
            Mở ứng dụng của bạn, <strong>quét mã QR code</strong> bên dưới
          </span>
          <div className="mt-3">
            <QRCode value={state.qrCode} renderAs="svg" includeMargin={true} level="H" size={300} />
          </div>
        </Col>
        <Col className="gutter-row" sm={8} xs={24}>
          <Title level={3} type="danger">
            Step 3
          </Title>
          <span>
            <strong>Nhập mã xác minh</strong> từ ứng dụng Authenticator của bạn
          </span>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Mã xác thực" name="code" rules={validation.code}>
              <Search allowClear={true} enterButton="Gửi mã" onSearch={_sendCode} loading={loading} />
            </Form.Item>
            <Form.Item label="Mã 2FA từ ứng dụng" name="tfa" rules={validation.tfa}>
              <Input autoComplete="off" allowClear={true} maxLength={6} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu
            </Button>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default React.memo(Bat2FAComponent);
