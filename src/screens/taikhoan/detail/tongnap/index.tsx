import {SearchOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, message, Pagination, Row, Select, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import {getDepositUsers} from './services';

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
  const {username} = useParams<{username: string}>();
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getTransaction(username, -1, new Date('2021-01-01'), new Date(), 1);
  }, []);

  const getTransaction = async (username: string, status: number, fromDate: Date, toDate: Date, page: number) => {
    setLoading(true);
    try {
      const result = await getDepositUsers({username, status, fromDate, toDate, page, limit: 50});
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
    getTransaction(username, -1, new Date('2021-01-01'), new Date(), page);
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
        <Table.Column<ColumnsProted> key="symbol" title="Mạng lưới" dataIndex="symbol" width={100} />
        <Table.Column<ColumnsProted>
          key="tx"
          title="Transaction"
          dataIndex="tx"
          width={500}
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
          key="status"
          title="Trạng thái"
          dataIndex="status"
          width={90}
          align="center"
          render={(text) => {
            switch (text) {
              case 1:
                return (
                  <Paragraph className="mb-0" type="success">
                    Thành công
                  </Paragraph>
                );
              case 2:
                return (
                  <Paragraph className="mb-0" type="danger">
                    Thất bại
                  </Paragraph>
                );
              default:
                return (
                  <Paragraph className="mb-0" type="warning">
                    Đang xử lý
                  </Paragraph>
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
