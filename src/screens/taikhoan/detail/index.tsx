import {green, red} from '@ant-design/colors';
import {SearchOutlined} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import {detailUser} from '../services';

const ChiTietTaiKhoanComponent = () => {
  const {addError} = useError();
  const [data, setData] = useState({
    _id: '',
    username: '',
    email: '',
    trc20: '',
    erc20: '',
    amount_spot: 0,
    amount_trade: 0,
    user_deposits: 0,
    user_withdraws: 0,
    commissions: 0,
    trade_win: 0,
    trade_loss: 0,
    tranfers_to_user: 0,
    receive_to_user: 0,
    sponsor: '',
  });
  const {showLoading, hideLoading} = useLoading();
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) getInfor(id);
  }, []);

  const getInfor = async (id: string) => {
    showLoading();
    try {
      const result = await detailUser(id);
      if (result && result.data) {
        console.log(result.data);
        setData(result.data);
      } else message.error('Lỗi khi tải thông tin người dùng!');
    } catch (error) {
      addError(error, 'Lỗi khi tải thông tin người dùng');
    } finally {
      hideLoading();
    }
  };

  return (
    <ContainerLayout>
      <Form labelCol={{span: 8}} wrapperCol={{span: 9}}>
        <Form.Item label="Tài khoản">
          <Form.Item noStyle>
            <Input readOnly={true} value={data.username} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Email">
          <Form.Item noStyle>
            <Input readOnly={true} value={data.email} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Sponsor">
          <Form.Item noStyle>
            <Input readOnly={true} value={data.sponsor} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Private key TRX20">
          <Form.Item noStyle>
            <Input.TextArea readOnly={true} value={data.trc20} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Private key ERC20">
          <Form.Item noStyle>
            <Input.TextArea readOnly={true} value={data.erc20} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Số tiền ví Spot">
          <Space>
            <Form.Item noStyle>
              <Input readOnly={true} value={formatter2.format(data.amount_spot)} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Số tiền ví Trade">
          <Space>
            <Form.Item noStyle>
              <Input readOnly={true} value={formatter2.format(data.amount_trade)} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền nạp">
          <Space>
            <Form.Item noStyle>
              <Input readOnly={true} value={formatter2.format(data.user_deposits)} />
            </Form.Item>
            <Typography.Link href={`/tongnap/${data.username}`}>Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền rút">
          <Space>
            <Form.Item noStyle>
              <Input readOnly={true} value={formatter2.format(data.user_withdraws)} />
            </Form.Item>
            <Typography.Link href={`/tongrut/${data.username}`}>Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền hoa hồng">
          <Space>
            <Form.Item noStyle>
              <Input readOnly={true} value={formatter2.format(data.commissions)} />
            </Form.Item>
            <Typography.Link href={`/hoahong/${data._id}`}>Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền các lệnh win / loss">
          <Space>
            <Form.Item noStyle>
              <Input
                readOnly={true}
                value={`${formatter2.format(data.trade_win)}`}
                style={{color: green.primary?.toString()}}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Input
                readOnly={true}
                value={`${formatter2.format(Math.abs(data.trade_loss))}`}
                style={{color: red.primary?.toString()}}
              />
            </Form.Item>
            <Typography.Link href={`/lichsutrade/${data._id}`}>Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label="Tổng tiền chuyển / nhận">
          <Space>
            <Form.Item noStyle>
              <Input
                readOnly={true}
                style={{color: red.primary?.toString()}}
                value={formatter2.format(data.tranfers_to_user)}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Input
                readOnly={true}
                style={{color: green.primary?.toString()}}
                value={formatter2.format(data.receive_to_user)}
              />
            </Form.Item>
            <Typography.Link href={`/tranfers/${data._id}`}>Chi tiết</Typography.Link>
          </Space>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" danger={true} htmlType="submit">
              Khóa user
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ContainerLayout>
  );
};

export default React.memo(ChiTietTaiKhoanComponent);
