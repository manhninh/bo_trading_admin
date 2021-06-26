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
import {useParams} from 'react-router-dom';
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
  const {username} = useParams<{username: string}>();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
    autoWithdraw: false,
  });

  useEffect(() => {
    getTransaction(username, -1, new Date('2021-01-01'), new Date(), 1);
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
    getTransaction(username, -1, new Date('2021-01-01'), new Date(), page);
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
          render={(text) => <strong>{formatter2.format(text)}$</strong>}
        />
        <Table.Column<ColumnsProted>
          key="fee"
          title="Phí"
          dataIndex="fee"
          align="right"
          width={100}
          render={(text) => <strong>{formatter2.format(text)}$</strong>}
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
