import {Button, Card, Form, Input, message, Modal} from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import useError from 'containers/hooks/errorProvider/useError';
import {Rule} from 'rc-field-form/lib/interface';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeStatusTFA} from 'routers/redux/slice';
import {fetchSendCodeToEmailInfor, verifyOTPToken} from './services';

const Tat2FAComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {addError} = useError();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await verifyOTPToken({
          password: values.code,
          code: values.tfa,
          secret: null,
          disabled: true,
        });
        if (result) {
          setIsModalVisible(false);
          dispatch(changeStatusTFA(false));
        } else message.error('Bật 2FA thất bại!');
      })
      .catch((error) => {
        addError(error, 'Tắt 2FA thất bại!');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const validation: {[key: string]: Rule[]} = {
    code: [{required: true, message: 'Nhập code gửi đến email!'}],
    tfa: [{required: true, message: 'Nhập code 2FA!'}],
  };

  const _sendCode = async () => {
    setLoading(true);
    try {
      await fetchSendCodeToEmailInfor();
      message.success('Kiểm tra email của bạn');
    } catch (error) {
      addError(error, 'Gửi code đến email thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cài đặt 2FA">
      <div className="text-center">
        <Title level={5} type="danger">
          Không sử dụng 2FA có thể gây nguy hiểm cho tài khoản của bạn!
        </Title>
        <Button type="primary" danger={true} loading={false} onClick={showModal}>
          Tắt 2FA
        </Button>
      </div>
      <Modal
        destroyOnClose={true}
        closable={false}
        title="Tắt 2FA"
        width={350}
        visible={isModalVisible}
        footer={[
          <Button key="submit" type="primary" loading={false} onClick={handleOk}>
            Tắt 2FA
          </Button>,
          <Button key="back" type="primary" danger={true} onClick={handleCancel}>
            Hủy bỏ
          </Button>,
        ]}>
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item label="Mã xác thực" name="code" rules={validation.code}>
            <Search allowClear={true} enterButton="Gửi mã" maxLength={6} onSearch={_sendCode} loading={loading} />
          </Form.Item>
          <Form.Item label="Mã 2FA từ ứng dụng" name="tfa" rules={validation.tfa} className="mb-0">
            <Input autoComplete="off" allowClear={true} maxLength={6} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default React.memo(Tat2FAComponent);
