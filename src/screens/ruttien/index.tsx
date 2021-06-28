import {CheckOutlined, CloseOutlined, SearchOutlined} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import {SYSTEM_CONFIG} from 'constants/system';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {formatter2} from 'utils/formatter';
import {autoWithdraw, getWithdrawUsers, withdrawConfirm, withdrawReject} from './services';

interface ColumnsProted {
  _id: string;
  amount: number;
  address: string;
  tx: string;
  status: number;
  user_id: string;
  createdAt: string;
  username: string;
  symbol: string;
}

const DanhSachNapTienComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
    autoWithdraw: false,
  });
  const configSettings = useAppSelector((state) => state.authState.accountInfor.config);

  useEffect(() => {
    form.setFieldsValue({
      username: '',
      status: -1,
      fromDate: moment().subtract(3, "month").startOf("month"),
      toDate: moment().endOf("month"),
    });
    if (configSettings.length > 0) {
      let autoWithdraw = configSettings.find(
        (item) => item.key === config.SYSTEM_ENABLE_AUTO_WITHDRAW && item.active === true,
      )?.value;
      autoWithdraw = Boolean(Number(autoWithdraw));
      setState((state) => ({...state, autoWithdraw}));
    }
    getTransaction('', -1, new Date(moment().subtract(3, "month").startOf("month").toString()), new Date(moment().endOf("month").toString()), 1);
  }, []);

  const getTransaction = async (username: string, status: number, fromDate: Date, toDate: Date, page: number) => {
    setLoading(true);
    try {
      const result = await getWithdrawUsers({username, status, fromDate, toDate, page, limit: 50});
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

  const _search = () => {
    setLoading(true);
    try {
      _changePage(1);
    } catch (err) {
      addError(err, 'Tìm kiếm thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    const {username, status, fromDate, toDate} = form.getFieldsValue();
    getTransaction(username, status, fromDate, toDate, page);
  };

  const _onOffProtectAuto = () => {
    try {
      autoWithdraw(
        config.SYSTEM_ENABLE_AUTO_WITHDRAW || 'ENABLE_AUTO_WITHDRAW',
        Number(!state.autoWithdraw).toString(),
      );
      setState((state) => ({...state, autoWithdraw: !state.autoWithdraw}));
    } catch (error) {
      addError(error, 'Bật/tắt rút tiền tự động thất bại');
    }
  };

  const acceptWithdraw = (transactionId: string) => async () => {
    try {
      withdrawConfirm(transactionId);
      const data = [...state.data];
      data.map((item: any) => {
        if (item._id === transactionId) item.status = SYSTEM_CONFIG.TRANSACTION_STATUS_PROCESSING;
        return item;
      });
      setState((state) => ({...state, data}));
    } catch (error) {
      addError(error, 'Lỗi khi duyệt rút tiền');
    }
  };

  const closeWithdraw = (transactionId: string) => async () => {
    try {
      withdrawReject(transactionId);
      const data = [...state.data];
      data.map((item: any) => {
        if (item._id === transactionId) item.status = SYSTEM_CONFIG.TRANSACTION_STATUS_CANCELLED;
        return item;
      });
      setState((state) => ({...state, data}));
    } catch (error) {
      addError(error, 'Lỗi khi hủy rút tiền');
    }
  };

  return (
    <ContainerLayout>
      <Card size="small">
        <Form layout="vertical" form={form}>
          <Row gutter={20}>
            <Col xs={24} sm={6}>
              <Form.Item label="Tài khoản" name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item label="Trạng thái" name="status">
                <Select defaultValue={-1}>
                  <Select.Option value={-1}>Tất cả</Select.Option>
                  <Select.Option value={0}>Chờ duyệt</Select.Option>
                  <Select.Option value={3}>Đang xử lý</Select.Option>
                  <Select.Option value={1}>Thành công</Select.Option>
                  <Select.Option value={2}>Thất bại</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Từ ngày" name="fromDate">
                <DatePicker defaultValue={moment().startOf('month')} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Đến ngày" name="toDate">
                <DatePicker defaultValue={moment().endOf("month")} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Space>
                <Button icon={<SearchOutlined />} type="primary" onClick={_search}>
                  Tìm kiếm
                </Button>
                <Popconfirm
                  placement="topLeft"
                  title="Bạn chắc chắn muốn thay đổi trạng thái?"
                  onConfirm={_onOffProtectAuto}
                  okText="Đồng ý"
                  cancelText="Hủy bỏ">
                  <Button type="primary" danger>
                    {state.autoWithdraw ? 'Tắt' : 'Bật'} rút tiền tự động
                  </Button>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        scroll={{x: 300}}
        locale={{emptyText: 'Không có dữ liệu'}}
        loading={loading}>
        <Table.Column<ColumnsProted>
          key="createdAt"
          title="Thời gian"
          dataIndex="createdAt"
          align="center"
          width={100}
          render={(text) => <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>}
        />
        <Table.Column<ColumnsProted> key="username" title="Tài khoản" dataIndex="username" width={150} />
        <Table.Column<ColumnsProted> key="symbol" title="Mạng lưới" width={100} dataIndex="symbol" />
        <Table.Column<ColumnsProted>
          key="tx"
          title="Transaction"
          dataIndex="tx"
          width={400}
          render={(text, record) => (
            <>
              <span>
                Địa chỉ ví: <strong>{record.address}</strong>
              </span>
              <br />
              {record.symbol.toLocaleLowerCase() === 'usdt-trc20' ? (
                <a target="_blank" rel="noopener noreferrer" href={`https://tronscan.io/#/transaction/${text}`}>
                  https://tronscan.io/#/transaction/{text}
                </a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/tx/${text}`}>
                  https://etherscan.io/tx/{text}
                </a>
              )}
            </>
          )}
        />
        <Table.Column<ColumnsProted>
          key="amount"
          title="Số tiền"
          dataIndex="amount"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)}$</span>}
        />
        <Table.Column<ColumnsProted>
          key="fee"
          title="Phí"
          dataIndex="fee"
          align="right"
          width={100}
          render={(text) => <span>{formatter2.format(text)}$</span>}
        />
        <Table.Column<ColumnsProted>
          key="status"
          title="Trạng thái"
          dataIndex="status"
          width={90}
          align="center"
          render={(text: SYSTEM_CONFIG, record) => {
            switch (text) {
              case SYSTEM_CONFIG.TRANSACTION_STATUS_SUCCESS:
                return (
                  <Paragraph className="mb-0" type="success">
                    Thành công
                  </Paragraph>
                );
              case SYSTEM_CONFIG.TRANSACTION_STATUS_CANCELLED:
                return (
                  <Paragraph className="mb-0" type="danger">
                    Thất bại
                  </Paragraph>
                );
              case SYSTEM_CONFIG.TRANSACTION_STATUS_PROCESSING:
                return (
                  <Paragraph className="mb-0" type="warning">
                    Đang xử lý
                  </Paragraph>
                );
              default:
                return state.autoWithdraw ? (
                  <Paragraph className="mb-0" type="secondary">
                    Chờ duyệt
                  </Paragraph>
                ) : (
                  <Space>
                    <Popconfirm
                      placement="topRight"
                      title="Bạn chắc chắn muốn duyệt rút tiền lệnh hiện tại?"
                      onConfirm={acceptWithdraw(record._id)}
                      okText="Đồng ý"
                      cancelText="Huỷ bỏ"
                      okType="primary">
                      <Tooltip placement="bottom" title="Duyệt lệnh" color="green">
                        <Button icon={<CheckOutlined />} type="primary" size="small" />
                      </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title="Bạn chắc chắn muốn hủy rút tiền lệnh hiện tại?"
                      onConfirm={closeWithdraw(record._id)}
                      okText="Đồng ý"
                      cancelText="Huỷ bỏ"
                      okType="primary">
                      <Tooltip placement="bottom" title="Hủy lệnh" color="red">
                        <Button icon={<CloseOutlined />} type="primary" danger={true} size="small" />
                      </Tooltip>
                    </Popconfirm>
                  </Space>
                );
            }
          }}
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

export default React.memo(DanhSachNapTienComponent);
