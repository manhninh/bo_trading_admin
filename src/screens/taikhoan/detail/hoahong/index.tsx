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
  Switch,
  Table,
  Typography,
} from 'antd';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import {getCommissionsTradeDetail} from './services';

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
  const {id} = useParams<{id: string}>();
  const [state, setState] = useState({
    textSearch: '',
    hideAmountSmall: false,
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getCommissions(id, new Date('2021-01-01'), new Date(), 1, 50);
  }, []);

  const getCommissions = async (id: string, fromDate: Date, toDate: Date, page: number, limit: number) => {
    setLoading(true);
    try {
      const result = await getCommissionsTradeDetail(id, fromDate, toDate, page, limit);
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
    getCommissions(id, new Date('2021-01-01'), new Date(), page, 50);
  };

  return (
    <ContainerLayout>
      <Table<ColumnsProted>
        size="small"
        bordered={true}
        dataSource={state.data}
        pagination={false}
        className="mb-0-75"
        locale={{emptyText: 'Không có dữ liệu'}}
        loading={loading}>
        <Table.Column<ColumnsProted>
          key="createdAt"
          title="Thời gian"
          dataIndex="createdAt"
          align="center"
          render={(text) => <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>}
        />
        <Table.Column<ColumnsProted> key="username" title="Tài khoản" dataIndex="username" />
        <Table.Column<ColumnsProted> key="level" title="Level" dataIndex="level" />
        <Table.Column<ColumnsProted>
          key="investment_amount"
          title="Số tiền đầu tư"
          dataIndex="investment_amount"
          align="right"
          render={(text) => <strong>{formatter2.format(text)}$</strong>}
        />
        <Table.Column<ColumnsProted>
          key="commission"
          title="Hoa hồng"
          dataIndex="commission"
          align="right"
          render={(text) => <strong>{formatter2.format(text)}$</strong>}
        />
        <Table.Column<ColumnsProted>
          key="is_withdraw"
          title="Đã rút về ví Spot chưa?"
          dataIndex="is_withdraw"
          align="center"
          render={(text) => <span style={{color: text ? green.primary : red.primary}}>{text ? 'Yes' : 'No'}</span>}
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
