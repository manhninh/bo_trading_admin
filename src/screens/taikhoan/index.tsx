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
  Switch,
  Table,
  Typography,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {formatter2} from 'utils/formatter';
import {getAllUsers, reset2FAUser} from './services';

interface ColumnsProted {
  _id: string;
  isEnabledTFA: boolean;
  time: string;
  open_result: number;
  close_result: number;
  buy_amount_order: number;
  sell_amount_order: number;
  amount_result: number;
}

const DanhSachTaiKhoanComponent = () => {
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const {showLoading, hideLoading} = useLoading();
  const [state, setState] = useState({
    textSearch: '',
    hideAmountSmall: false,
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getTransaction('', false, 1);
  }, []);

  const getTransaction = async (textSearch: string, hideAmountSmall: boolean, page: number) => {
    setLoading(true);
    try {
      const result = await getAllUsers({textSearch, hideAmountSmall, page, limit: 50});
      if (result && result.data) {
        setState((state) => ({
          ...state,
          page,
          data: result.data.docs,
          total: result.data.total,
        }));
      } else message.error('Lỗi khi tải danh sách người dùng!');
    } catch (error) {
      addError(error, 'Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    getTransaction(state.textSearch, state.hideAmountSmall, page);
  };

  const _changeText = (evt: any) => {
    setState((state) => ({...state, textSearch: evt.target.value}));
  };

  const _changeSwitch = (evt) => {
    setState((state) => ({...state, hideAmountSmall: evt}));
  };

  const confirm = (userId: string) => async () => {
    showLoading();
    try {
      await reset2FAUser(userId);
      getTransaction(state.textSearch, state.hideAmountSmall, state.page);
    } catch (error) {
      addError(error, 'Đặt lại 2FA của người dùng thất bại!');
    } finally {
      hideLoading();
    }
  };

  return (
    <ContainerLayout>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        scroll={{x: 300}}
        locale={{emptyText: 'Không có dữ liệu'}}
        title={() => (
          <Row>
            <Col xs={24} sm={16}>
              <Form layout="inline">
                <Form.Item label="Tài khoản hoặc Email" className="mb-0">
                  <Input onChange={_changeText} />
                </Form.Item>
                <Form.Item label="Ẩn số dư nhỏ hơn" className="mb-0">
                  <Switch onChange={_changeSwitch} />
                </Form.Item>
              </Form>
            </Col>
            <Col xs={24} sm={8} className="text-right">
              <Button icon={<SearchOutlined />} type="primary" onClick={() => _changePage(1)}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        )}
        loading={loading}>
        <Table.Column<ColumnsProted>
          key="username"
          title="Tài khoản"
          dataIndex="username"
          width={150}
          render={(text, record) => <Typography.Link href={`chitiet/${record._id.toString()}`}>{text}</Typography.Link>}
        />
        <Table.Column<ColumnsProted> key="email" title="Email" dataIndex="email" width={250} />
        <Table.Column<ColumnsProted>
          key="is_sponsor"
          title="Sponsor"
          dataIndex="is_sponsor"
          align="center"
          width={90}
          render={(text) => <Checkbox defaultChecked={Boolean(text)} disabled />}
        />
        <Table.Column<ColumnsProted>
          key="is_expert"
          title="Chuyên gia"
          dataIndex="is_expert"
          align="center"
          width={90}
          render={(text) => <Checkbox defaultChecked={Boolean(text)} disabled />}
        />
        <Table.Column<ColumnsProted>
          key="amount"
          title="Ví chính"
          dataIndex="amount"
          align="right"
          width={120}
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="amount_trade"
          title="Ví trade"
          dataIndex="amount_trade"
          align="right"
          width={120}
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="amount_copytrade"
          title="Ví copy"
          dataIndex="amount_copytrade"
          align="right"
          width={120}
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="amount_expert"
          title="Ví chuyên gia"
          dataIndex="amount_expert"
          align="right"
          width={120}
          render={(text) => <span>{formatter2.format(text)} USDF</span>}
        />
        <Table.Column<ColumnsProted>
          key="_id"
          title=""
          dataIndex="_id"
          align="center"
          width={80}
          render={(text, record) =>
            record.isEnabledTFA ? (
              <Popconfirm
                placement="left"
                title="Bạn có chắc chắn muốn đặt lại 2FA của người dùng?"
                onConfirm={confirm(text)}
                okText="Đồng ý"
                cancelText="Huỷ bỏ">
                <Button size="small" type="primary" danger ghost title="Đặt lại 2FA">
                  Tắt 2FA
                </Button>
              </Popconfirm>
            ) : null
          }
        />
      </Table>
      <Pagination
        current={state.page}
        pageSize={50}
        total={state.total}
        showSizeChanger={false}
        onChange={_changePage}
      />
    </ContainerLayout>
  );
};

export default React.memo(DanhSachTaiKhoanComponent);
