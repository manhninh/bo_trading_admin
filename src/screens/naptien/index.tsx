import {SearchOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, message, Pagination, Row, Select, Table} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContainerLayout from 'containers/components/layout';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
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
  const [form] = Form.useForm();
  const {addError} = useError();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    data: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    form.setFieldsValue({
      username: '',
      status: -1,
      fromDate: moment(),
      toDate: moment(),
    });
    getTransaction('', -1, new Date(), new Date(), 1);
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

  const _search = () => {
    setLoading(true);
    try {
      _changePage(1);
    } catch (err) {
      addError(err, 'Login fail');
    } finally {
      setLoading(false);
    }
  };

  const _changePage = (page: number) => {
    const {username, status, fromDate, toDate} = form.getFieldsValue();
    getTransaction(username, status, fromDate, toDate, page);
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
                  <Select.Option value={0}>Đang xử lý</Select.Option>
                  <Select.Option value={1}>Thành công</Select.Option>
                  <Select.Option value={2}>Thất bại</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Từ ngày" name="fromDate">
                <DatePicker defaultValue={moment().startOf('week')} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item label="Đến ngày" name="toDate">
                <DatePicker defaultValue={moment().endOf('week')} allowClear={false} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Button icon={<SearchOutlined />} type="primary" onClick={_search}>
                Tìm kiếm
              </Button>
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
          render={(text) => <span>{formatter2.format(text)} USDT</span>}
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
