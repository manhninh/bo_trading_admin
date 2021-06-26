import {green, red} from '@ant-design/colors';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, message, Pagination, Row, Select, Space, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import {getTradeHistory} from './services';

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
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const {id} = useParams<{id: string}>();
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getTransaction(id, 1);
  }, []);

  const getTransaction = async (id: string, page: number) => {
    setLoading(true);
    try {
      const result = await getTradeHistory(id, page.toString(), 50, '0');
      if (result && result.data) {
        setState({
          page,
          data: result.data.docs,
          total: result.data.total,
        });
      } else message.error('Lỗi khi tải danh sách người dùng!');
    } catch (error) {
      addError(error, 'Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    getTransaction(id, page);
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
          key="order_uuid"
          title="Thời gian"
          dataIndex="order_uuid"
          align="center"
          render={(text) => <span>{moment(Number(text)).format('DD/MM/YYYY HH:mm:ss')}</span>}
        />
        <Table.Column<ColumnsProted>
          key="open_result"
          title="Open"
          dataIndex="open_result"
          align="right"
          render={(text) => <span>{formatter2.format(text)}</span>}
        />
        <Table.Column<ColumnsProted>
          key="close_result"
          title="Close"
          dataIndex="close_result"
          align="right"
          render={(text) => <span>{formatter2.format(text)}</span>}
        />
        <Table.Column<ColumnsProted>
          key="buy_amount_order"
          title="Số tiền Buy"
          dataIndex="buy_amount_order"
          align="right"
          render={(text) => <strong style={{color: green.primary}}>{formatter2.format(text)}$</strong>}
        />
        <Table.Column<ColumnsProted>
          key="sell_amount_order"
          title="Số tiền Sell"
          dataIndex="sell_amount_order"
          align="right"
          render={(text) => <strong style={{color: red.primary}}>{formatter2.format(text)}$</strong>}
        />
        <Table.Column<ColumnsProted>
          key="amount_result"
          title="Kết quả"
          dataIndex="amount_result"
          align="right"
          render={(text) => (
            <Space>
              <strong style={{color: Number(text) > 0 ? green.primary : red.primary}}>
                {Number(text) > 0 ? 'WIN' : 'LOSS'}
              </strong>
              <strong style={{color: Number(text) > 0 ? green.primary : red.primary}}>-</strong>
              <strong style={{color: Number(text) > 0 ? green.primary : red.primary}}>{Math.abs(Number(text))}$</strong>
            </Space>
          )}
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
